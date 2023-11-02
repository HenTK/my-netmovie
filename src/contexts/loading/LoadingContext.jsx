import { Spin } from "antd";
import { createContext, useEffect, useState } from "react";
import "./index.scss";
import Loading from "../../pages/loading/Loading";
import Poster from "../../components/poster/Poster";
import { WrapperSpin } from "./styled";

const DEFAULT_STATE = {
    isLoading: false,
};

const LoadingContext = createContext(DEFAULT_STATE);

const LoadingProvider = (props) => {
    const [state, setState] = useState(DEFAULT_STATE);

    useEffect(()=>{
        //kéo lên đầu trang mới load
        window.scrollTo(0,0);
        //hiện loading và ẩn đi các phần overflow của trang web do spin height: 100vh
        document.querySelector("body").style.overflow = state.isLoading ? "hidden" : "auto";

    },[state.isLoading])

    return (<LoadingContext.Provider value={[state, setState]}>
        {
            state.isLoading && (
                // <div className="spin">
                //     {/* <Spin size = "large"/> */}
                //     <Poster/>
                //     <Loading/>
                // </div>
                <WrapperSpin customBackground = "white">
                    <Poster/>
                    <Loading/>
                </WrapperSpin>        
            )
        }
            {props.children}
            </LoadingContext.Provider>)
}

export {
    LoadingContext,
    LoadingProvider
};
