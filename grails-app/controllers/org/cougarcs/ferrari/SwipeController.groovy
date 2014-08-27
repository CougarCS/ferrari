package org.cougarcs.ferrari

import grails.converters.JSON

class SwipeController {

	def index() {
		new CougarCSMember(peoplesoftId: '867753').save()
		println CougarCSMember.findByPeoplesoftId('867753')
		println CougarCSMember.fromBean([peoplesoftId: '867753'])
	}

	def readCard() {
		def cardInfo = params.swipe =~ /%0*(\d+)?/
		if (cardInfo.find()) {
			cardInfo = cardInfo.group(1)

			CougarCSMember member

			if ((member = CougarCSMember.findByPeoplesoftId(cardInfo)) == null) {
				member = new CougarCSMember(peoplesoftId: cardInfo)
				member.save(true)
			}

			render member.toBean() as JSON
		}
		else {
			response.sendError(400)
		}
	}
}
