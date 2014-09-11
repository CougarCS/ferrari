<div class="row">
	<form role="form" id="lookupForm" class="col-sm-12">
		<div class="form-group">
			<label for="peoplesoftId">Peoplesoft Id</label>
			<g:textField class="form-control" type="number" name="peoplesoftId" id="peoplesoftId" placeholder="Enter peoplesoft id"/>
		</div>
		<button type="submit" class="btn btn-default">Submit</button>
	</form>
</div>

<hr/>

<div class="row">
	<form role="form" id="editForm" class="col-sm-12">
		<g:hiddenField name="peoplesoftId" id="peoplesoftId"/>
		<div class="form-group">
			<label for="name">Student Name</label>
			<g:textField class="form-control" name="name" id="name" placeholder="Enter student name"/>
		</div>
		<div class="form-group">
			<label for="emailAddress">Email Address</label>
			<g:textField class="form-control" type="email" name="emailAddress" id="emailAddress" placeholder="Enter primary email address"/>
		</div>
		<div class="row">
			<div class="form-group col-sm-4">
				<label>
					Classification <g:select from="${classifications}" class="form-control" name="classification" id="classification"/>
				</label>
			</div>
			<div class="form-group col-sm-4">
				<label>
					Shirt Size <g:select from="${shirtSizes}" class="form-control" name="shirtSize" id="shirtSize"/>
				</label>
			</div>
			<div class="form-group col-sm-4">
				<label>
					Pizza Type <g:select from="${pizzaTypes}" class="form-control" name="pizzaType" id="pizzaType"/>
				</label>
			</div>
		</div>
		<div class="row">
			<div class="form-group col-sm-4">
				<label>
					Member has paid dues?
					<g:checkBox class="form-control" name="paid" id="paid"/>
				</label>
			</div>
			%{--<div class="form-group col-sm-4">--}%
				%{--<label>--}%
					%{--Member is admin?--}%
					%{--<g:checkBox class="form-control" name="isAdmin" id="isAdmin"/>--}%
				%{--</label>--}%
			%{--</div>--}%
			<div class="form-group col-sm-offset-4 col-sm-4">
				<br/>
				<button type="submit" class="btn btn-default">Submit</button>
			</div>
		</div>
	</form>
</div>