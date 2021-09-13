const mongoose = require('mongoose');
const User = require('../model/user.model');
const PrayerRequest = require('../model/prayerRequest.model');

const prayerRequestController = {
    createPrayerRequest: async (req, res) => {
        try {
            const { title, body } = req.body;
            if(!title || !body) {
                return res.status(422).send({ message: 'Fields are empty, please add fields!' })
            }
            req.user.password = undefined;

            const newPrayer = new PrayerRequest({
                title,
                body,
                prayedBy: req.user.id
            })
            const prayers = await newPrayer.save()
            res.status(201).json({prayers})
        } catch(error){
            return res.status(401).send({error})
        }
    },
    getMyPrayers: async (req, res) => {
        try {
            const myPrayers = await PrayerRequest.find({ prayedBy: req.user.id })
            .populate('prayedBy', 'id username')
            res.status(200).json({ myPrayers })
        } catch(e) {
            res.status(401).json({ error: e })
        }
    }
}

module.exports = { prayerRequestController };
