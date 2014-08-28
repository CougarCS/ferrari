<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
	<meta name="layout" content="main">
	<title></title>

	<script type="text/javascript">
		var url = '${createLink(controller: 'swipe', action: 'readCard')}';
	</script>

	<asset:javascript src="swipe.js"/>
	<asset:stylesheet src="swipe.css"/>
</head>

<body>
	<div id="feedback" class="col-sm-3 col-sm-offset-9"></div>
</body>
</html>