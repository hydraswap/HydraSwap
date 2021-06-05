import React, { useEffect, useState } from 'react';
import './index.less';
import LogoOpen from '../../assets/img/img_logo@2x.png';
import LogoClose from '../../assets/img/icon_Hydrawap.svg';

import LiquidityIcon from '../../assets/img/leftbar_liquidity@2xnormal.png';
import MinningIcon from '../../assets/img/leftbar_minning_selected@2xnormal.png';
import SwapIcon from '../../assets/img/leftbar_swap_selected@2xnormal.png';
import TradingIcon from '../../assets/img/leftbar_Trading_selected@2x.png';
import MenuOpenedIcon from '../../assets/img/icon_menuOpened@2x.png';
import MenuUpIcon from '../../assets/img/icon_menuUp@2x.png';

export const CustomSidebar = () => {
    const [currentStatus, setCurrentStatus] = useState('close');
    const [liquiditySubMenuIsShow, setLiquiditySubMenuIsShow] = useState(false);
    const [contactMenuShow, setContactMenuShow] = useState(false);
    const [guidMenuShow, setGuidMenuShow] = useState(false);
    
    function goUrl(url) {
        window.location.href = `https://app.hydraswap.io/${url}`
    }

    return (
        <div className={currentStatus === 'open' ? 'sidebar open' : 'sidebar close'}>
            <div className="logo">
                <img className="open-logo" src={LogoOpen} />
                <img className="close-logo" src={LogoClose} />
            </div>
            <div className="toggle-btn">
                {currentStatus === 'close' ? <img className="toggle-btn" src={MenuUpIcon} onClick={() => setCurrentStatus('open')}/>:
                <img className="toggle-btn" src={MenuOpenedIcon} onClick={() => setCurrentStatus('close')}/>}
            </div>
            <ul className="menu-list">
                <li className="active">
                    <img className="menu-icon" src={TradingIcon} />
                    <span>Trading</span>
                </li>
                <li onClick={() => goUrl('swap')}>
                    <img className="menu-icon" src={SwapIcon} />
                    <span>Swap</span>
                </li>
                <li className="have-sub-menu">
                    <div className="title" onClick={() => setLiquiditySubMenuIsShow(!liquiditySubMenuIsShow)}>
                        <img className="menu-icon" src={LiquidityIcon} />
                        <div className="right">
                            <span>Liquidity</span>
                            <svg className={liquiditySubMenuIsShow ? 'open icon' : 'close icon'} aria-hidden="true">
                                <use xlinkHref="#icondown"></use>
                            </svg>
                        </div>
                    </div>
                    <ul className={liquiditySubMenuIsShow ? 'open sub-menu-list' : 'close sub-menu-list'}>
                        <li onClick={() => goUrl('liquidity')}>Add Liquidity</li>
                        <li onClick={() => goUrl('farming')}>LP Farming</li>
                    </ul>
                </li>
                <li onClick={() => goUrl('staking')}>
                    <img className="menu-icon" src={MinningIcon} />
                    <span>Staking</span>
                </li>
            </ul>

            <div className="bottom">
                <div className={guidMenuShow ? 'active guide' : 'guide'} onClick={() => setGuidMenuShow(!guidMenuShow)}>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#iconmenu"></use>
                    </svg>
                    <a href="https://hydraswap.gitbook.io/hydraswap/" target="_blank" rel="noopener noreferrer">Paper & Guide</a>
                </div>
                <div className={contactMenuShow ? 'active contact-list' : 'contact-list'} onClick={() => setContactMenuShow(!contactMenuShow)}>
                    <a>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#iconicon_share"></use>
                        </svg>
                    </a>
                    <a href="https://twitter.com/HydraSwap_io" target="_blank" rel="noopener noreferrer">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#iconicon_twitter"></use>
                        </svg>
                    </a>
                    <a href="https://t.me/hydraswap" target="_blank" rel="noopener noreferrer">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#iconicon_TelegramGroup3"></use>
                        </svg>
                    </a>
                    <a href="https://t.me/hydraswap_ANN" target="_blank" rel="noopener noreferrer">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#iconicon_TelegramChannel"></use>
                        </svg>
                    </a>
                    <a href="https://medium.com/@HydraSwap" target="_blank" rel="noopener noreferrer">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#iconicon_Medium"></use>
                        </svg>
                    </a>
                    <a href="https://discord.gg/hmYNVdUWSR" target="_blank" rel="noopener noreferrer">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#iconicon_Discord"></use>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}