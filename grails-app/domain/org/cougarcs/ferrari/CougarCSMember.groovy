package org.cougarcs.ferrari

import com.zeebo.lwo.BeanProperty

class CougarCSMember {

	static enum Classifications {
		FRESHMAN, SOPHMORE, JUNIOR, SENIOR, GRADUATE, MASTERS, PHD
	}

	static enum ShirtSizes {
		S, M, L, XL, XXL, XXXL
	}

	static enum PizzaTypes {
		CHEESE, PEPPERONI, SAUSAGE, VEGGIE
	}

	static constraints = {
		peoplesoftId blank: false, unique: true
		emailAddress blank: false
		cardNumber nullable: true
		isAdmin nullable: true
		password nullable: true
		salt blank: false
		classification nullable: true
		shirtSize nullable: true
		pizzaType nullable: true
	}

	@BeanProperty(true)
	String peoplesoftId

	@BeanProperty
	String emailAddress

	@BeanProperty
	String name

	@BeanProperty
	boolean paid

	String cardNumber

	boolean isAdmin

	String password
	String salt = UUID.randomUUID().toString()

	@BeanProperty
	String classification
	transient Classifications getClassificationEnum() {
		return Classifications.values().find { it.name() == this.@classification }
	}
	void setClassification(Classifications clazz) {
		this.@classification = clazz?.name()
	}
	void setClassification(String clazz) {
		this.@classification = clazz
	}

	@BeanProperty
	String shirtSize
	transient ShirtSizes getShirtSizeEnum() {
		return ShirtSizes.values().find { it.name() == this.@shirtSize }
	}
	void setShirtSize(ShirtSizes ss) {
		this.@shirtSize = ss?.name()
	}
	void setShirtSize(String ss) {
		this.@shirtSize = ss
	}

	@BeanProperty
	String pizzaType
	transient PizzaTypes getPizzaTypeEnum() {
		return PizzaTypes.values().find { it.name() == this.@pizzaType }
	}
	void setPizzaType(PizzaTypes type) {
		this.@pizzaType = type
	}
	void setPizzaType(String type) {
		this.@pizzaType = type
	}
}
