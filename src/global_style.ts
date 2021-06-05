import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
html,body{
  background: #11161D;
}
input[type=number]::-webkit-inner-spin-button {
  opacity: 0;
}
input[type=number]:hover::-webkit-inner-spin-button,
input[type=number]:focus::-webkit-inner-spin-button {
  opacity: 0.25;
}
/* width */
::-webkit-scrollbar {
  width: 15px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #2d313c;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #5b5f67;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #5b5f67;
}
.ant-slider-track, .ant-slider:hover .ant-slider-track {
  background-color: #07ebad;
  opacity: 0.75;
}
.ant-slider-track,
.ant-slider ant-slider-track:hover {
  background-color: #07ebad;
  opacity: 0.75;
}
.ant-slider-dot-active,
.ant-slider-handle,
.ant-slider-handle-click-focused,
.ant-slider:hover .ant-slider-handle:not(.ant-tooltip-open)  {
  border: 2px solid #07ebad; 
}
.ant-table-tbody > tr.ant-table-row:hover > td {
  background: #273043;
}
.ant-table-tbody > tr > td {
  border-bottom: 8px solid #020F16;
}
.ant-table-container table > thead > tr:first-child th {
  border-bottom: none;
}
.ant-divider-horizontal.ant-divider-with-text::before, .ant-divider-horizontal.ant-divider-with-text::after {
  border-top: 1px solid #434a59 !important;
}
.ant-layout {
    background: #11161D
  }
  .ant-table {
    background: #212734;
  }
  .ant-table-thead > tr > th {
    background: #020F16;
  }
.ant-select-item-option-content {
  img {
    margin-right: 4px;
  }
}
.ant-modal-content {
  background-color: #212734;
}

.ant-radio-button-wrapper:not(:first-child)::before {
  display: none;
}

.ant-switch-checked {
  background-color: #07EBAD;
}

button.ant-btn-background-ghost {
  border-color: #07ebad;
  background: rgba(90, 196, 190, 0.1);
  border-radius: 4px;
  padding: 0px 24px;
  color: #07ebad;
  &:hover,
  &:active {
    border: 1px solid #79ffdb !important;
    color: #79ffdb !important;
  }
  &:disabled {
    background: rgba(255, 255, 255, 0.1) !important;
    border: 1px solid rgba(255, 255, 255, 0.4) !important;
  }
}

.ant-tabs {
  color: rgba(255, 255, 255, 0.5) !important;
}
.ant-tabs-ink-bar {
  background: none !important;
}
.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
  color: #fff !important;
}

.ant-table {
  background: #020F16;
}

.ant-modal {
  background: linear-gradient(270deg, #00ff9d 0%, #00f1ff 50%, #ff0071 100%) !important;
  border-radius: 30px !important;
  padding: 2px !important;
  .ant-modal-content {
    background: #000 !important;
    border-radius: 30px !important;
    padding-bottom: 20px;
    .ant-modal-header {
      background: none !important;
      border-bottom: none !important;
      color: #fff;
      .ant-modal-title {
        color: #fff;
      }
    }
    .ant-modal-body {
      padding: 20px;
    }
    .ant-modal-footer {
      background: none !important;
      border-top: none !important;
      color: #fff;
    }
  }
}

/* .ant-slider-dot-active, .ant-slider-handle, .ant-slider-handle-click-focused, .ant-slider:hover .ant-slider-handle:not(.ant-tooltip-open) {
  background: linear-gradient(270deg, #00ffb7 0%, #00bfff 50%, #ff1a7f 100%);
} */

@-webkit-keyframes highlight {
  from { background-color: rgba(7,235,173, 0.4);}
  to {background-color: #020F16;}
}
@-moz-keyframes highlight {
  from { background-color: rgba(7,235,173, 0.4);}
  to {background-color: #020F16;}
}
@-keyframes highlight {
  from { background-color: rgba(7,235,173, 0.4);}
  to {background-color: #020F16;}
}

@-webkit-keyframes highlight2 {
  from { background-color: rgba(216,58,236, 0.4);}
  to {background-color: #020F16;}
}

@-moz-keyframes highlight2 {
  from { background-color: rgba(216,58,236, 0.4);}
  to {background-color: #020F16;}
}
@-keyframes highlight2 {
  from { background-color: rgba(216,58,236, 0.4);}
  to {background-color: #020F16;}
}


.flash {
  -moz-animation: highlight 0.5s ease 0s 1 alternate ;
  -webkit-animation: highlight 0.5s ease 0s 1 alternate;
  animation: highlight 0.5s ease 0s 1 alternate;
}

.flash2 {
  -moz-animation: highlight2 0.5s ease 0s 1 alternate ;
  -webkit-animation: highlight2 0.5s ease 0s 1 alternate;
  animation: highlight2 0.5s ease 0s 1 alternate;
}`;




