import { useSelector } from "react-redux";
import { useMemo } from "react";

const TheatreList = () => {
    const {
        list: theatres,
        selectedTheatre,
        isModelOpen,
        isDeleteModelOpen,
        formType,
        status,
        error
    } = useSelector((store) => store.theatres);

    const theatresData = useMemo(() => {
        return theatres.map((item) => {
            return { ...item, key: `theatre${item._id}` }
        })
    }, [theatres]);

    const tableHeadings = [
        { title: 'Theatre Name', dataIndex: 'name' },

    ]

}