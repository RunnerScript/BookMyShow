import { Modal } from "antd"
import { useSelector, useDispatch } from "react-redux";
import { closeDeleteModal, deleteTheatre } from "../../redux/theatreSlice";

const DeleteTheatreModal = () => {
    const {
        isDeleteModalOpen,
        selectedTheatre
    } = useSelector((store) => store.theatres);

    const dispatch = useDispatch();
    const handleDelete = async () => {
        if (selectedTheatre) {
            const response = await dispatch(deleteTheatre(selectedTheatre._id)).unwrap();
            if (response.success) {
                dispatch(closeDeleteModal());
            } else {
                console.log(response);
            }

        }

    }
    return (
        <>
            <Modal
                title='Delete Theatre'
                open={isDeleteModalOpen}
                onCancel={() => dispatch(closeDeleteModal())}
                onOk={() => handleDelete()}
                okText="Delete"
                cancelText="cancel"
            >
                <div className="d-flex flex-col justify-content-center align-center">
                    <b>Are you sure to Delete the theatre {selectedTheatre ? selectedTheatre.name : ''}? , Press Delete button to delete the theatre</b>
                </div>
            </Modal>

        </>
    )

}

export default DeleteTheatreModal;