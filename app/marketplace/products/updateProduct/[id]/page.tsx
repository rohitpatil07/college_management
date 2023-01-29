import React from "react";
import UpdateProductComponent from "../../../../../components/Marketplace/UpdateProductComponent";

type PageProps = {
	params: {
		id: number;
	};
};

const UpdateProduct = ({ params: { id } }: PageProps) => {
	return (
		<div>
			<UpdateProductComponent product_id={id} />
		</div>
	);
};

export default UpdateProduct;
