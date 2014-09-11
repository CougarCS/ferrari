package org.cougarcs.ferrari

import org.h2.security.SHA256

/**
 * User: Eric
 * Date: 9/10/14
 */
class CougarCSMemberService {

	def createMember(String name, String password, String peoplesoftId) {
		CougarCSMember member = new CougarCSMember()

		member.name = name
		member.password = calculatePasswordHash(password, member.salt)
		member.peoplesoftId = peoplesoftId.removeLeading '0'

		return member
	}

	def calculatePasswordHash(String password, String salt) {
		return SHA256.getHashWithSalt(password.bytes, salt.bytes)
	}
}
