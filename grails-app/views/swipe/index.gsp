<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
	<meta name="layout" content="main">
	<title></title>

	<script type="text/javascript">

		var string = '';

		var began = false;

		$(document).ready(function() {
			$('body').on('keypress', function(e) {
				var it = String.fromCharCode(e.charCode);
				if (it == '%') {
					began = true;
				}
				if (began) {
					string += it;
					if (it == '?') {
						began = false;
						submitID();
						string = '';
					}
				}
			});
		});

		var submitID = function() {
			$.ajax({
				url: '${createLink(controller: 'swipe', action: 'readCard')}',
				data: {swipe: string},
				cache: false,
				contentType: 'application/json',
				success: function(data) {
					console.log(data);
				}
			});
		}
	</script>
</head>

<body>

</body>
</html>