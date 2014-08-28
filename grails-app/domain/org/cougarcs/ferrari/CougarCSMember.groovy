package org.cougarcs.ferrari

import com.zeebo.lwo.BeanProperty

class CougarCSMember {

	static constraints = {
		peoplesoftId nullable: false
		cardNumber nullable: false
		isAdmin nullable: true
		password nullable: true
	}

	@BeanProperty(true)
	String peoplesoftId

	String cardNumber

	boolean isAdmin

	String password
}
