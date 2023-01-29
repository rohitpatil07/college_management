import React from "react";
import UpdateLostComponent from "../../../../../components/Marketplace/UpdateLostComponent";

type PageProps = {
	params: {
		id: number;
	};
};

const UpdateLostItem = ({ params: { id } }: PageProps) => {
	return (
		<div>
			<UpdateLostComponent item_id={id} />
		</div>
	);
};

export default UpdateLostItem;
