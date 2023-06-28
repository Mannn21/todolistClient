import React from "react";
import { Checkbox, Table } from "flowbite-react";
import {
	Container,
	Wrapper,
	FilterWrapper,
	DropdownWrapper,
	Label,
	Select,
	Option,
} from "./styled.js";
import TableRow from "./TableRow/index.jsx";

const TableActivities = ({id, expire, token}) => {
	return (
		<Container>
			<Wrapper>
				<FilterWrapper>
					<DropdownWrapper>
						<Label htmlFor="filter">Filter :</Label>
						<Select name="filter" id="filter">
							<Option value="all">All</Option>
							<Option value="category">Category</Option>
							<Option value="status">Status</Option>
						</Select>
					</DropdownWrapper>
				</FilterWrapper>
				<Table hoverable>
					<Table.Head>
						<Table.HeadCell style={{textAlign: "center"}}>Title</Table.HeadCell>
						<Table.HeadCell style={{textAlign: "center"}}>Category</Table.HeadCell>
						<Table.HeadCell style={{textAlign: "center"}}>Date Time</Table.HeadCell>
						<Table.HeadCell style={{textAlign: "center"}}>Status</Table.HeadCell>
						<Table.HeadCell style={{textAlign: "center"}}>Edit Status</Table.HeadCell>
						<Table.HeadCell style={{textAlign: "center"}}>Edit</Table.HeadCell>
						<Table.HeadCell style={{textAlign: "center"}}>Delete</Table.HeadCell>
					</Table.Head>
					<Table.Body className="divide-y">
						<TableRow id={id} expire={expire} token={token}/>
					</Table.Body>
				</Table>
			</Wrapper>
		</Container>
	);
};

export default TableActivities;
