import { useMemo } from "react";
import { Table, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { openModal, openDeleteModal, closeModal, closeDeleteModal, updateTheatre } from "../../redux/theatreSlice";
import TheatreForm from "./TheatreForm";
import DeleteMovieModal from "./DeleteMovieModal";
import DeleteTheatreModal from "./DeleteTheatreModal";
import { useNavigate } from "react-router-dom";


const TheatreList = () => {
    const {
        list: theatres,
        selectedTheatre,
        isModalOpen,
        isDeleteModalOpen,
        formType,
        status,
        error
    } = useSelector((store) => store.theatres);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const theatresData = useMemo(() => {
        return theatres.map((item) => {
            return { ...item, key: `theatre${item._id}` }
        })
    }, [theatres]);


    const tableHeadings = [
        { title: 'Theatre Name', dataIndex: 'name' },
        { title: 'Address', dataIndex: 'address' },
        { title: 'Phone', dataIndex: 'phone' },
        { title: 'Email', dataIndex: 'email' },
        {
            title: 'Status', dataIndex: 'isActive', render: (status, data) => {
                return data.isActive ? "Approved" : "Pending/Block";
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, data) => {
                return (
                    <div className="d-flex flex-col">
                        <Button className="btn-tables" onClick={() => {
                            dispatch(openModal({ theatre: data, formType: "edit" }));
                        }} > <EditOutlined /></Button>
                        <Button className="btn-tables" onClick={() => {
                            dispatch(openDeleteModal({ theatre: data, formType: "delete" }));
                        }}><DeleteOutlined /> </Button>
                        <Button className="btn-tables" onClick={async () => {
                            navigate(`/shows/${data.name}___${data._id}`);
                        }}>Shows</Button>
                    </div>
                )

            }
        }



    ];
    return (
        <>
            <div className="d-flex justify-content-end align-end   flex-col">
                <Button className='max-width-100 ' onClick={() => {
                    dispatch(openModal({ theatre: null, formType: "add" }));
                }}>Add Theatre</Button>
            </div>
            <Table dataSource={theatresData} columns={tableHeadings} />
            {
                isModalOpen && <TheatreForm />
            }
            {
                isDeleteModalOpen && <DeleteTheatreModal />
            }
        </>
    )
}

export default TheatreList;