package org.cougarcs.ferrari

import com.zeebo.lwo.BeanProperty

class CougarCSMember {

	static constraints = {
		peoplesoftId nullable: false
		isAdmin nullable: true
		password nullable: true
	}

	@BeanProperty(true)
	String peoplesoftId

	boolean isAdmin

	String password
}
