import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Link } from "react-router-dom";

const TableBody = ({ data, columns }) => {
    const renderContent = (item, column) => {
        const component = columns[column].component;
        if (typeof component === "function") {
            return component(item);
        } else if (column === "name") {
            return <Link to={`users/${item._id}`}>{item.name}</Link>;
        } else {
            return _.get(item, columns[column].path);
        }
    };

    return (
        <tbody>
            {data.map((item) => (
                <tr key={item._id}>
                    {Object.keys(columns).map((column) => (
                        <td key={column}>{renderContent(item, column)}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableBody;
