import React, {useState} from 'react';
import './index.less';

import LogoImg from '../../assets/img/img_logo@2x.png';

import LiquidityIcon from '../../assets/img/leftbar_liquidity@2x.png';
import MinningIcon from '../../assets/img/leftbar_minning_selected@2x.png';
import SwapIcon from '../../assets/img/leftbar_swap_selected@2x.png';
import TradingIcon from '../../assets/img/leftbar_Trading_selected@2x.png';
// import MenuOpenedIcon from '../../assets/img/icon_menuOpened@2x.png';
// import MenuUpIcon from '../../assets/img/icon_menuUp@2x.png';
// import { createDecipheriv } from 'crypto';

export const H5Header = () => {

    const [showMenu, setShowMenu] = useState(false)
    const [liquiditySubMenuIsShow, setLiquiditySubMenuIsShow] = useState(false)

    function goUrl(url) {
        window.location.href = `https://app.hydraswap.io/${url}`
    }

    return (
        <div className="h5-head-container">
            <div className="top">
                <div className="left">
                    <img src={LogoImg} />
                </div>
                <div className="right">
                    {!showMenu ? <svg className="icon" aria-hidden="true" onClick={() => setShowMenu(!showMenu)}>
                        <use xlinkHref="#iconicon_Menu"></use>
                    </svg>
                    :<svg className="icon" aria-hidden="true" onClick={() => setShowMenu(!showMenu)}>
                        <use xlinkHref="#iconicon_Menu1"></use>
                    </svg>}
                </div>
            </div>
            {showMenu ? <div className="menu-list-box">
                <ul className="menu-list">
                    <li>
                        <img src={TradingIcon} />
                        <span>Trading</span>
                    </li>
                    <li onClick={() => goUrl('swap') }>
                        <img src={SwapIcon} />
                        <span>Swap</span>
                    </li>
                    <li className="have-sub-menu">
                        <div
                            className="title"
                            onClick={() => setLiquiditySubMenuIsShow(!liquiditySubMenuIsShow)}
                        >
                            <img src={LiquidityIcon} />
                            <span>Liquidity</span>
                            <svg className={liquiditySubMenuIsShow ? 'open icon' : 'close icon'} aria-hidden="true">
                                <use xlinkHref="#icondown"></use>
                            </svg>
                        </div>
                    <ul className={liquiditySubMenuIsShow ? 'open sub-menu-list' : 'close sub-menu-list'}>
                        <li  onClick={() => goUrl('liquidity')}>Add Liquidity</li>
                        <li  onClick={() => goUrl('farming')}>LP Farming</li>
                    </ul>
                    </li>
                    <li onClick={() => goUrl('staking')}>
                        <img src={MinningIcon} />
                        <span>Staking</span>
                    </li>
                </ul>
                <a className="paper-guide" href="https://hydraswap.gitbook.io/hydraswap/" target="_blank">
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#iconmenu"></use>
                    </svg>
                    <span>Paper & Guide</span>
                </a>

                <div className="contact-list">
                    <a href="https://twitter.com/HydraSwap_io" target="_blank">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#iconicon_twitter"></use>
                        </svg>
                    </a>
                    <a href="https://t.me/hydraswap" target="_blank">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#iconicon_TelegramGroup3"></use>
                        </svg>
                    </a>
                    <a href="https://t.me/hydraswap_ANN" target="_blank">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#iconicon_TelegramChannel"></use>
                        </svg>
                    </a>
                    <a href="https://medium.com/@HydraSwap" target="_blank">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#iconicon_Medium"></use>
                        </svg>
                    </a>
                    <a href="https://discord.gg/hmYNVdUWSR" target="_blank">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#iconicon_Discord"></use>
                        </svg>
                    </a>
                </div>
            </div> : null}
        </div>
    )
}