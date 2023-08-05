import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import ReactDOM from 'react-dom';

export default forwardRef((props, ref) => {
    console.log(props);
    const {isOpenselect} = props;
    const [isOpen, setIsOpen] = useState(isOpenselect);
    const dropdownMenuRef = useRef(null);

    const [ready, setReady] = useState(false);
    const [happy, setHappy] = useState(false);
    const [done, setDone] = useState(false);
    const refContainer = useRef(null);

    const checkAndToggleMoodIfLeftRight = (event) => {
        if (ready) {
            if (['ArrowLeft', 'ArrowRight'].indexOf(event.key) > -1) {
                // left and right
                const isLeft = event.key === 'ArrowLeft';
                setHappy(isLeft);
                event.stopPropagation();
            }
        }
    };

    useEffect(() => {
        if (done) props.stopEditing();
    }, [done]);

    // logic to close dropdown during outside click
    useEffect(() => {
        if (isOpen) {
            // let dropOffset = dropdownMenuRef.current.getBoundingClientRect();
            // let innnerHeight = window.innerHeight;
            // // if (innnerHeight - dropOffset < scrollHeight) {
            // if (dropOffset.top > innnerHeight / 2) {
            //     dropdownMenuRef.current.classList.add('reverse');
            // } else {
            //     dropdownMenuRef.current.classList.remove('reverse');
            // }
        }
    }, [isOpen]);

    useEffect(() => {
        ReactDOM.findDOMNode(refContainer.current).focus();
        setReady(true);
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', checkAndToggleMoodIfLeftRight);

        return () => {
            window.removeEventListener('keydown', checkAndToggleMoodIfLeftRight);
        };
    }, [checkAndToggleMoodIfLeftRight, ready]);

    useImperativeHandle(ref, () => {
        return {
            getValue() {
                return happy ? 'Happy' : 'Sad';
            },
        };
    });
    const toggle = () => setIsOpen(!isOpen); // toggle the dropdown

    const handleBtnClick = () => {
        toggle();
        
    };

    return (

        <div 
            ref={refContainer} 
            className={`dropdown dropdown-select ${isOpen ? 'show' : ''}`}
            >
            <button 
                onClick={handleBtnClick}
                class="button dropdown-toggle dropdown-select-button" 
                type="button" data-toggle="dropdown" aria-expanded="false" data-testid="miniCartOverlay_quantity_drpdwn" 
                aria-label="Quantity Selector, Number of Quantity, 2">
                <span aria-live="polite" class=" dropdown-select-selected-option">2</span>
                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" class="dropdown-select-icon ">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 15.5a.997.997 0 0 1-.707-.293l-4-4a.999.999 0 1 1 1.414-1.414l3.305 3.305 3.293-3.18a1 1 0 0 1 1.39 1.439l-4 3.862A.997.997 0 0 1 12 15.5Z" fill="#03210E"></path></svg>
            </button>
            <ul 
                ref={dropdownMenuRef}
                className={`dropdown-select-menu ${isOpen ? 'show' : ''}`} 
                aria-label="filterdropdown"
                >
                <li class="dropdown-list-item  dropdown-select-item " data-testid="select_dropdown_testid" role="option" aria-selected="false" aria-label="1" tabindex="0">1</li>
                <li class="dropdown-list-item  dropdown-select-item active" data-testid="select_dropdown_testid" role="option" aria-selected="true" aria-label="2" tabindex="0">2
                    <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" class="dropdown-select-check"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.576 12a.667.667 0 0 1-.486-.21L2.848 8.337a.666.666 0 1 1 .971-.912l2.75 2.927 5.606-6.135a.667.667 0 0 1 .984.899l-6.091 6.667A.665.665 0 0 1 6.58 12h-.005Z" fill="#008545"></path></svg>
                </li>
                <li class="dropdown-list-item  dropdown-select-item " data-testid="select_dropdown_testid" role="option" aria-selected="false" aria-label="3" tabindex="0">3</li>
                <li class="dropdown-list-item  dropdown-select-item " data-testid="select_dropdown_testid" role="option" aria-selected="false" aria-label="4" tabindex="0">4</li>
                <li class="dropdown-list-item  dropdown-select-item " data-testid="select_dropdown_testid" role="option" aria-selected="false" aria-label="5" tabindex="0">5</li>
                <li class="dropdown-list-item  dropdown-select-item " data-testid="select_dropdown_testid" role="option" aria-selected="false" aria-label="6" tabindex="0">6</li>
                <li class="dropdown-list-item  dropdown-select-item " data-testid="select_dropdown_testid" role="option" aria-selected="false" aria-label="7" tabindex="0">7</li>
                <li class="dropdown-list-item  dropdown-select-item " data-testid="select_dropdown_testid" role="option" aria-selected="false" aria-label="8" tabindex="0">8</li>
                <li class="dropdown-list-item  dropdown-select-item " data-testid="select_dropdown_testid" role="option" aria-selected="false" aria-label="9" tabindex="0">9</li>
                <li class="dropdown-list-item  dropdown-select-item " data-testid="select_dropdown_testid" role="option" aria-selected="false" aria-label="10" tabindex="0">10</li>
                <li class="dropdown-list-item  dropdown-select-item " data-testid="select_dropdown_testid" role="option" aria-selected="false" aria-label="11" tabindex="0">11</li>
                <li class="dropdown-list-item  dropdown-select-item " data-testid="select_dropdown_testid" role="option" aria-selected="false" aria-label="12" tabindex="0">12</li>
                <li class="dropdown-list-item  dropdown-select-item " data-testid="select_dropdown_testid" role="option" aria-selected="false" aria-label="13" tabindex="0">13</li>
                <li class="dropdown-list-item  dropdown-select-item " data-testid="select_dropdown_testid" role="option" aria-selected="false" aria-label="14" tabindex="0">14</li>
                <li class="dropdown-list-item  dropdown-select-item " data-testid="select_dropdown_testid" role="option" aria-selected="false" aria-label="15" tabindex="0">15</li>
                <li class="dropdown-list-item  dropdown-select-item " data-testid="select_dropdown_testid" role="option" aria-selected="false" aria-label="16" tabindex="0">16</li>
                <li class="dropdown-list-item  dropdown-select-item " data-testid="select_dropdown_testid" role="option" aria-selected="false" aria-label="17" tabindex="0">17</li>
                <li class="dropdown-list-item  dropdown-select-item " data-testid="select_dropdown_testid" role="option" aria-selected="false" aria-label="18" tabindex="0">18</li>
                <li class="dropdown-list-item  dropdown-select-item " data-testid="select_dropdown_testid" role="option" aria-selected="false" aria-label="19" tabindex="0">19</li>
                <li class="dropdown-list-item  dropdown-select-item " data-testid="select_dropdown_testid" role="option" aria-selected="false" aria-label="20" tabindex="0">20</li>
                <li class="dropdown-list-item  dropdown-select-item " data-testid="select_dropdown_testid" role="option" aria-selected="false" aria-label="21" tabindex="0">21</li>
                <li class="dropdown-list-item  dropdown-select-item " data-testid="select_dropdown_testid" role="option" aria-selected="false" aria-label="22" tabindex="0">22</li>
                <li class="dropdown-list-item  dropdown-select-item " data-testid="select_dropdown_testid" role="option" aria-selected="false" aria-label="23" tabindex="0">23</li>
                <li class="dropdown-list-item  dropdown-select-item " data-testid="select_dropdown_testid" role="option" aria-selected="false" aria-label="24" tabindex="0">24</li>
                <li class="dropdown-list-item  dropdown-select-item " data-testid="select_dropdown_testid" role="option" aria-selected="false" aria-label="25" tabindex="0">25</li>
            </ul>
        </div>
    );
});
