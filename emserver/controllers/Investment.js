const mongoose = require("mongoose");
const User = require('../models/User');
const Invest = require('../models/Investment');
const PayTo = require('../models/PayTo');
const Card = require('../models/Card');
const Group = require('../models/Group');
const Investment = require("../models/Investment");

exports.invest = async (req, res) => {
    try {
        const { facility, amount, userIds } = req.body
        const investedBy = req.user.id
        const groupId = req.params.groupId

        console.log("all body data", facility, amount, userIds, investedBy, groupId);
     
        if (!facility || !amount || amount <= 0 || !userIds || userIds.length === 0 || !investedBy || !groupId) {
            return res.status(402).json({
                success: false,
                message: "All fields are required"
            })
        }

        const newInvestment = await Invest.create({
            facility: facility,
            amount: amount,
            investedBy: investedBy
        })
        console.log("newInvestment", newInvestment);

        const group = await Group.findById(groupId).populate('cards');
        if (!group) {
            return res.status(404).json({
                success: false,
                message: "Group not found"
            });
        }

        const CardInfo =await group.cards.find(card =>card.user && card.group &&  card.user.toString() === investedBy && card.group.toString() === groupId);
        if (!CardInfo) {
            return res.status(404).json({
                success: false,
                message: "Card not found for the invested user in this group"
            });
        }

        const entryInvestment = await Card.findByIdAndUpdate(CardInfo._id, {
            $push: {
                investments: newInvestment._id
            }
        }, { new: true })

        console.log("group", group);
        console.log("CardInfo", CardInfo);
        console.log("entryInvestment", entryInvestment);

        const amountPerHead = amount / (userIds.length + 1);
        console.log("amountperhead", amountPerHead);

        await Promise.all(userIds.map(async (userID) => {
            let amountPerHeadCal = amountPerHead;

            const existingPayto = await PayTo.findOne({ payto: userID, payBy: investedBy });
            console.log("existingPayto", existingPayto);

            if (existingPayto) {
                if (existingPayto.amountPay > amountPerHeadCal) {
                    const finalAmount = existingPayto.amountPay - amountPerHeadCal;
                    console.log("finalAmount", finalAmount);
                    const updateexistingPayto = await PayTo.findOneAndUpdate({ payto: userID, payBy: investedBy }, {
                        $set: { amountPay: finalAmount }
                    }, { new: true })
                    console.log("updateexistingPayto", updateexistingPayto);
                }
                else {
                    const updateexistingPayto2 = await PayTo.findOneAndUpdate({ payto: userID, payBy: investedBy }, {
                        $set: { amountPay: 0 }
                    }, { new: true })
                    console.log("updateexistingPayto2", updateexistingPayto2);

                    amountPerHeadCal -= existingPayto.amountPay;
                    if (amountPerHeadCal > 0) {
                        const userpaytofind = await PayTo.findOne({ payto: investedBy, payBy: userID });
                        console.log("userpaytofind", userpaytofind);

                        if (userpaytofind) {
                            const updatepayto3 = await PayTo.findByIdAndUpdate(userpaytofind._id, {
                                $push: {
                                    amountPay: amountPerHeadCal,
                                }
                            }, { new: true })
                            console.log("updatepayto3", updatepayto3);
                            amountPerHeadCal = 0;
                        }
                        else {
                            const addPaytouser = await PayTo.create({
                                amountPay: amountPerHeadCal,
                                payto: investedBy,
                                payBy: userID
                            })
                            console.log("addPaytouser", addPaytouser);
                            amountPerHeadCal = 0;
                            const cardupdate = await Card.findByIdAndUpdate(addPaytouser._id, {
                                $push: { payTo: addPaytouser._id }
                            }, { new: true })
                            console.log("cardupdate", cardupdate);
                        }
                    }
                }
            }
            else {
                const userPaytoschema = await PayTo.findOne({ payto: investedBy, payBy: userID });
                console.log("userPaytoschema", userPaytoschema);

                if (userPaytoschema) {
                    const updatePayto4 = await PayTo.findByIdAndUpdate(userPaytoschema._id, {
                        $set: {
                            amountPay: userPaytoschema.amountPay + amountPerHeadCal
                        }
                    }, { new: true })
                    console.log("updatePayto4", updatePayto4);
                    amountPerHeadCal = 0;
                }
                else {
                    const newEntryPaytoforuser = await PayTo.create({
                        amountPay: amountPerHeadCal,
                        payto: investedBy,
                        payBy: userID
                    })
                    console.log("newEntryPaytoforuser", newEntryPaytoforuser)
                    amountPerHeadCal = 0;
                    const cardupdate2 = await Card.findOneAndUpdate({ user: userID, group: groupId }, {
                        $push: {
                            payTo: newEntryPaytoforuser._id
                        }
                    }, { new: true })
                    console.log("cardupdate2", cardupdate2);
                }
            }
        }))


        return res.status(200).json({
            success: true,
            message: "money invested successfully"
        })
    }
    catch (error) {
        console.error("Error processing investment:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to invest the money",
            error: error.message
        });
    }
};


exports.editInvest = async (req, res) => {
    try {
        const { facility, amount, userIds } = req.body;
        const { groupId, investmentId } = req.params;
        const investingUserId = req.user._id;

        if (!investmentId || !facility || amount === undefined || amount <= 0 || !groupId || !userIds || userIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Investment ID, facility, amount, groupId, and userIds are required"
            });
        }

        const investment = await Invest.findById(investmentId);
        if (!investment) {
            return res.status(404).json({
                success: false,
                message: "Investment not found"
            });
        }

        const oldAmount = investment.amount;
        investment.facility = facility;
        investment.amount = amount;
        await investment.save();

        const group = await Group.findById(groupId).populate('users');
        if (!group) {
            return res.status(404).json({
                success: false,
                message: "Group not found"
            });
        }

        const groupUserIds = group.users.map(user => user._id.toString());
        const selectedUserIds = userIds.filter(id => groupUserIds.includes(id));

        if (selectedUserIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: "None of the selected users are in the group"
            });
        }

        const newAmountPerUser = amount / (selectedUserIds.length + 1);
        const oldAmountPerUser = oldAmount / (selectedUserIds.length + 1);

        await Promise.all(selectedUserIds.map(async (userId) => {
            let remainingAmount = newAmountPerUser - oldAmountPerUser;
            const existingPayTo = await PayTo.findOne({ payBy: investingUserId, payTo: userId });

            if (existingPayTo) {
                const previousAmount = existingPayTo.amountPay;
                if (previousAmount > remainingAmount) {
                    existingPayTo.amountPay -= remainingAmount;
                    remainingAmount = 0;
                } else {
                    remainingAmount -= previousAmount;
                    existingPayTo.amountPay = 0;
                }
                await existingPayTo.save();
            }

            if (remainingAmount > 0) {
                const userPayTo = await PayTo.findOne({ payBy: userId, payTo: investingUserId });
                if (userPayTo) {
                    userPayTo.amountPay += remainingAmount;
                    await userPayTo.save();
                    return userPayTo;
                } else {
                    return await PayTo.create({
                        amountPay: remainingAmount,
                        payTo: investingUserId,
                        payBy: userId
                    });
                }
            }
        }));

        const updatedPayToEntries = await PayTo.find({ payBy: { $in: selectedUserIds }, payTo: investingUserId });

        await Promise.all(updatedPayToEntries.map(async (payToEntry) => {
            const card = await Card.findOne({ group: groupId, user: payToEntry.payBy });
            if (card) {
                await Card.findByIdAndUpdate(card._id, { $addToSet: { payTo: payToEntry._id } });
            }
        }));

        const investingUserCard = await Card.findOne({ group: groupId, user: investingUserId });
        if (investingUserCard) {
            await Card.findByIdAndUpdate(investingUserCard._id, { $addToSet: { investments: investment._id } });
        }

        res.status(200).json({
            success: true,
            message: "Investment updated and recorded successfully",
            updatedPayToEntries,
            investingUserCard
        });
    } catch (error) {
        console.error("Error processing investment update:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};
