<form role="form" id="addForm">
	<div class="form-group">
		<label for="name">Student Name</label>
		<g:textField class="form-control" name="name" id="name" placeholder="Enter student name"/>
	</div>
	<div class="form-group">
		<label for="peoplesoftId">Peoplesoft Id</label>
		<g:textField class="form-control" type="number" name="peoplesoftId" id="peoplesoftId" placeholder="Enter peoplesoft id"/>
	</div>
	<div class="form-group">
		<label for="emailAddress">Email Address</label>
		<g:textField class="form-control" type="email" name="emailAddress" id="emailAddress" placeholder="Enter primary email address"/>
	</div>
	<div class="checkbox">
		<label>
			<g:checkBox name="paid" id="paid"/> Member has paid dues?
		</label>
	</div>
	<button type="submit" class="btn btn-default">Submit</button>
</form>