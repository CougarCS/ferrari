package org.cougarcs.ferrari

import com.zeebo.lwo.BeanProperty

class CougarCSMember {

	static constraints = {
		peoplesoftId blank: false, unique: true
		emailAddress blank: false
		cardNumber nullable: true
		isAdmin nullable: true
		password nullable: true
		salt blank: false
	}

	@BeanProperty(true)
	String peoplesoftId

	@BeanProperty
	String emailAddress

	@BeanProperty
	String name

	String cardNumber

	boolean isAdmin

	String salt = UUID.randomUUID().toString()

	String password

	@BeanProperty
	boolean paid
}
