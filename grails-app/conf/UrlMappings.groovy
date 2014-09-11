class UrlMappings {

	static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

		name addForm: "/swipe/addForm"(view:'/swipe/addForm')
		name lookupForm: "/swipe/lookupForm"(view:'/swipe/lookupForm')

        "/"(controller:'swipe',action:'index')
        "500"(view:'/error')
	}
}
