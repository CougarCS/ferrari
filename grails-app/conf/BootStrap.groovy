class BootStrap {

    def init = { servletContext ->

	    String.metaClass.removeLeading = { c ->
		    return replaceAll("^$c*", '')
	    }
    }
    def destroy = {
    }
}
