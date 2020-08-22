import React from "react";
function QuoteForm() {
	return (
		<div className="container">
			<form action="/quote/new/process" method="POST">
				<div className="form-row">
					<div className="col-sm">
						<label for="job">Job</label>
						<input
							className="form-control"
							id="job"
							type="text"
							placeholder="job"
							name="Job"
						/>
						<br />
					</div>
					<div className="col-sm">
						<label>Product</label>
						<input
							className="form-control"
							type="text"
							placeholder="product"
							name="Product"
						/>
					</div>
				</div>
				<div className="form-row">
					<div className="form-group col">
						<label>Quantity</label>

						<input
							className="form-control"
							type="text"
							placeholder="Qty"
							name="Qty"
						/>
					</div>
					<div className="form-row">
						<div className="form-group col">
							<label>Estimated Revenue</label>
							<input
								className="form-control"
								type="text"
								placeholder="Revenue"
								name="EstRev"
							/>
						</div>
					</div>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
export default QuoteForm;
