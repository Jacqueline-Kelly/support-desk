const asyncHandler = require('express-async-handler')

const Ticket = require('../models/ticketModel')

const getTickets = asyncHandler( async(req, res) => {
    const tickets = await Ticket.find({user: req.user.id})
    res.status(200).json(tickets).end()  
})

const getTicket = asyncHandler( async(req, res) => {
    const ticket = await Ticket.findById()

    if(!ticket) {
        res.status(404)
        throw new Error('Could not find ticket')
    }

    if(ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }
    res.status(200).json(ticket)
    
})

const createTicket = asyncHandler( async(req, res) => {
    const { product, description } = req.body

    if(!product || !description) {
        res.status(400)
        throw new error ('Please enter product and description')
    }

    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status:'new'
    })
    res.status(201).json(ticket)
})

const deleteTicket = asyncHandler( async(req, res) => {

    const ticket = await Ticket.findById()

    if(!ticket) {
        res.status(404)
        throw new Error('Could not find ticket')
    }

    if(ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    await ticket.remove()

    res.status(200).json({success: true})
    
})

const updateTicket = asyncHandler( async(req, res) => {

    const ticket = await Ticket.findById()

    if(!ticket) {
        res.status(404)
        throw new Error('Could not find ticket')
    }

    if(ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: true})
    res.status(200).json(updatedTicket)
    
})

module.exports = {
    getTickets,
    getTicket,
    createTicket,
    deleteTicket,
    updateTicket,
}