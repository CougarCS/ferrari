package org.cougarcs.ferrari

import grails.converters.JSON

class SwipeController {

	def index() {
		println CougarCSMember.all.collect { [it.peoplesoftId, it.cardNumber] }
//		new CougarCSMember(peoplesoftId: '867753').save()
//		println CougarCSMember.findByPeoplesoftId('867753')
//		println CougarCSMember.fromBean([peoplesoftId: '867753'])
	}

	def readCard() {
		def cardInfo = params.swipe =~ /%0*(\d+)\?;(\d+)0\?/
		if (cardInfo.find()) {
			def psId = cardInfo.group(1)
			def cardNumber = cardInfo.group(2)

			CougarCSMember member

			if ((member = CougarCSMember.findByPeoplesoftId(psId)) == null) {
				member = new CougarCSMember(peoplesoftId: psId)
			}

			if (member.cardNumber == null || member.cardNumber != null && member.cardNumber == cardNumber) {
				if (member.cardNumber == null) {
					member.cardNumber = cardNumber
					member.save()
				}
				render member.toBean() as JSON
			}
			else {
				response.sendError(400)
			}
		}
		else {
			response.sendError(400)
		}
	}
}
