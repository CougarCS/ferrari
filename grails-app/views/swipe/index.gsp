<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
	<meta name="layout" content="main">
	<title></title>

	<script type="text/javascript">
		var url = '${createLink(controller: 'swipe', action: 'readCard')}';
		var addFormUrl = '${createLink(mapping: 'addForm')}';
		var addSubmitUrl = '${createLink(controller: 'swipe', action: 'addMember')}';
		var lookupFormUrl = '${createLink(mapping: 'lookupForm')}';
		var lookupSubmitUrl = '${createLink(controller: 'swipe', action: 'lookupMember')}';
		var editSubmitUrl = '${createLink(controller: 'swipe', action: 'editMember')}';
	</script>

	<asset:javascript src="swipe.js"/>
	<asset:stylesheet src="swipe.css"/>
</head>

<body>
	<div class="row">
		<div id="swipe">
			<div id="addButton" class="button col-sm-2">ADD</div>
			<div id="lookupButton" class="button col-sm-2">LOOKUP</div>
			<div id="feedback" class="col-sm-3 col-sm-offset-5"></div>
		</div>
	</div>
	<div class="row">
		<div id="formContent" class="col-sm-6"></div>
	</div>
</body>
</html>