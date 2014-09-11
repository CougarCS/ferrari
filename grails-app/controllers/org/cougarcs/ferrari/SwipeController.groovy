package org.cougarcs.ferrari

import grails.converters.JSON

class SwipeController {

	def cougarCSMemberService

	def index() {
		println CougarCSMember.all.collect { [it.peoplesoftId, it.cardNumber] }
//		new CougarCSMember(peoplesoftId: '867753').save()
//		println CougarCSMember.findByPeoplesoftId('867753')
//		println CougarCSMember.fromBean([peoplesoftId: '867753'])
	}

	def readCard() {
		println params.actionType
		def cardInfo = params.swipe =~ /%0*(\d+)\?;(\d+)0\?/
		if (cardInfo.find()) {
			def psId = cardInfo.group(1)
			def cardNumber = cardInfo.group(2)

			CougarCSMember member

			if ((member = CougarCSMember.findByPeoplesoftId(psId)) == null) {
				member = new CougarCSMember(peoplesoftId: psId)
			}
			if ((params.actionType == 'ADD' && member.cardNumber == null) ||
					(params.actionType == 'VERIFY' && member.cardNumber != null && member.cardNumber == cardNumber)) {
				if (member.cardNumber == null) {
					member.cardNumber = cardNumber
					member.save()
				}
				render member.toBean() as JSON
			}
			else {
				response.sendError(403)
			}
		}
		else {
			response.sendError(400)
		}
	}

	def addForm() {
		render model: [
				classifications: ['', CougarCSMember.Classifications.collect { it.name() }].flatten(),
				shirtSizes: ['', CougarCSMember.ShirtSizes.collect { it.name() }].flatten(),
				pizzaTypes: ['', CougarCSMember.PizzaTypes.collect { it.name() }].flatten()
		], view: 'addForm'
	}

	def lookupForm() {
		render model: [
				classifications: ['', CougarCSMember.Classifications.collect { it.name() }].flatten(),
				shirtSizes: ['', CougarCSMember.ShirtSizes.collect { it.name() }].flatten(),
				pizzaTypes: ['', CougarCSMember.PizzaTypes.collect { it.name() }].flatten()
		], view: 'lookupForm'
	}

	def addMember() {

		CougarCSMember member = CougarCSMember.findByPeoplesoftId(params.peoplesoftId.removeLeading('0'))

		if (member == null) {
			member = cougarCSMemberService.createMember(params.name, '', params.peoplesoftId)
			member.emailAddress = params.emailAddress
			member.paid = params.paid
			member.classification = params.classification
			member.shirtSize = params.shirtSize
			member.pizzaType = params.pizzaType

			println member as JSON
			member.save(true)

			render([success: true] as JSON)
		}
		else {
			render([success: false, reason: 'Member alread exists'] as JSON)
		}
	}

	def lookupMember() {

		CougarCSMember member = CougarCSMember.findByPeoplesoftId(params.peoplesoftId.removeLeading('0'))

		if (member != null) {
			render member.toBean() as JSON
		}
		else {
			response.sendError(403);
		}
	}

	def editMember() {

		params.peoplesoftId = params.peoplesoftId.removeLeading('0')
		CougarCSMember member = CougarCSMember.fromBean(params)

		println member.toBean() as JSON

		if (member != null) {
			member.save(true)
			render([success: true] as JSON)
		}
		else {
			response.sendError(403)
		}
	}
}
