import {useNavigate} from "react-router-dom";
import style from "./Pagination.module.css"
import Button from "../Buttons/Button.tsx";

interface PaginationProps {
    minimum?: number;
    currentPage: number;
    maximum: number;
}

const ELEMET_COUNT = 5

interface PaginationElement {
    content: React.ReactNode;
    active?: boolean;
    link?: string;
}

const Pagination: React.FC<PaginationProps> = (props) => {
    const navigate = useNavigate();
    const minimum = props.minimum ? props.minimum : 1
    const generateLink = (page: number) => {
        return "/"
    }
    const createPaginationElement = (page: number, active?:boolean): PaginationElement => {
        return {
            content: page,
            link: generateLink(page),
            active: active
        }
    }
    const createList = () => {
        let first: number;
        let last: number;
        if (props.maximum - props.currentPage < ELEMET_COUNT) {
            first = props.maximum - ELEMET_COUNT < minimum ? minimum : props.maximum - ELEMET_COUNT;
            last = props.maximum;
            debugger;
        } else {
            first = props.currentPage;
            last = props.currentPage + ELEMET_COUNT - 2;
            debugger;
        }

        const list: PaginationElement[] = []
        for (let i = first; i <= last; i++) {
            list.push(createPaginationElement(i, i === props.currentPage));
        }
        if (last !== props.maximum) {
            list.push({content: "..."});
            list.push(createPaginationElement(props.maximum, props.maximum === props.currentPage));
        }
        return list
    }

    const baseElementStyle = style.item;
    const selectedElemetStyle = style.item + " " + style.item_selected;

    return (
        <div className={style.container}>
            {
                minimum === props.currentPage ? (
                    <Button variant="secondary" disabled={true}>
                        ← Prev
                    </Button>
                ) : (
                    <Button variant="secondary" onClick={() => {
                        navigate(generateLink(props.currentPage - 1))
                    }}>
                        ← Prev
                    </Button>
                )
            }
            <div className={style.item_container}>
                {
                    createList().map((element) => (
                        element.link ? (
                            <a
                                href={element.link}
                                className={element.active ? selectedElemetStyle : baseElementStyle}
                            >
                                {element.content}
                            </a>
                        ) : (
                            <div className={baseElementStyle}>{element.content}</div>
                        )
                    ))
                }

            </div>
            {
                props.maximum === props.currentPage ? (
                    <Button variant="secondary" disabled={true}>
                        Next →
                    </Button>
                ) : (
                    <Button variant="secondary" onClick={() => {
                        navigate(generateLink(props.currentPage + 1))
                    }}>
                        Next →
                    </Button>
                )
            }
        </div>
    )
}

export default Pagination;