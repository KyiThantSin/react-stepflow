import{R as e,r as N}from"./iframe-DpILvb9s.js";import{m as w,S as l}from"./Step-DxFAXOUN.js";const ve="_stepperWrapper_k8oa5_1",be="_stepperWrapperHorizontal_k8oa5_9",fe="_stepperWrapperVertical_k8oa5_13",Ce="_stepper_k8oa5_1",ge="_horizontal_k8oa5_23",we="_vertical_k8oa5_30",_e="_contentContainer_k8oa5_36",ze="_smoothTransition_k8oa5_43",Ne="_scrollContent_k8oa5_47",Ee="_scrollContainer_k8oa5_53",xe="_scrollContainerHorizontal_k8oa5_62",ke="_scrollContainerVertical_k8oa5_76",Te="_stepSpacing_k8oa5_90",ye="_previewStep_k8oa5_94",Ve="_activeStep_k8oa5_99",qe="_stepContent_k8oa5_104",Be="_stepContentHorizontal_k8oa5_114",He="_stepContentVertical_k8oa5_120",We="_contentBelow_k8oa5_127",Fe="_contentBeside_k8oa5_131",i={stepperWrapper:ve,stepperWrapperHorizontal:be,stepperWrapperVertical:fe,stepper:Ce,horizontal:ge,vertical:we,contentContainer:_e,smoothTransition:ze,scrollContent:Ne,scrollContainer:Ee,scrollContainerHorizontal:xe,scrollContainerVertical:ke,stepSpacing:Te,previewStep:ye,activeStep:Ve,stepContent:qe,stepContentHorizontal:Be,stepContentVertical:He,contentBelow:We,contentBeside:Fe},Me="_connector_127gx_1",Ie="_progress_127gx_1",y={connector:Me,"connector-horizontal":"_connector-horizontal_127gx_8","connector-vertical":"_connector-vertical_127gx_15","connector-completed":"_connector-completed_127gx_22","connector-active":"_connector-active_127gx_26","connector-disabled":"_connector-disabled_127gx_30",progress:Ie},ae=({orientation:t="horizontal",completed:o=!1,active:f=!1,disabled:E=!1,className:x,style:C,completedColor:m,activeColor:k,thickness:S})=>{const V=w(y.connector,y[`connector-${t}`],o&&!m&&y["connector-completed"],f&&!k&&y["connector-active"],E&&y["connector-disabled"],x,"react-stepflow-ui-connector"),q={...C,...o&&m&&{backgroundColor:m},...f&&k&&{backgroundColor:k},...S&&{[t==="horizontal"?"height":"width"]:typeof S=="number"?`${S}rem`:S}};return e.createElement("div",{className:V,style:q,"aria-hidden":"true"})};ae.__docgenInfo={description:"",methods:[],displayName:"StepConnector",props:{orientation:{required:!1,tsType:{name:"union",raw:'"horizontal" | "vertical"',elements:[{name:"literal",value:'"horizontal"'},{name:"literal",value:'"vertical"'}]},description:"",defaultValue:{value:'"horizontal"',computed:!1}},completed:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},active:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""},completedColor:{required:!1,tsType:{name:"string"},description:""},activeColor:{required:!1,tsType:{name:"string"},description:""},thickness:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:""}}};const _=({activeStep:t=0,orientation:o="horizontal",showConnector:f=!0,className:E,children:x,connectorColor:C,connectorThickness:m,smoothTransition:k=!1,scrollComponent:S=!1})=>{var L,A,D,O;const[V,q]=N.useState(t),d=S?V:t;N.useEffect(()=>{q(t)},[t]);const T=N.useRef(null),u=N.useRef([]),c=(L=e.Children.toArray(x))==null?void 0:L.filter(Boolean),P=(D=(A=c==null?void 0:c[d])==null?void 0:A.props)==null?void 0:D.component,ie=a=>{var v;if(!a)return d;const n=o==="horizontal";let s=0,h=d;return(v=u.current)==null||v.forEach((b,g)=>{if(!b)return;const r=b.getBoundingClientRect(),p=a.getBoundingClientRect();let z=0,B=0;if(n){B=r==null?void 0:r.width;const $=Math.max(r==null?void 0:r.left,p==null?void 0:p.left);z=Math.min(r==null?void 0:r.right,p==null?void 0:p.right)-$}else{B=r==null?void 0:r.height;const $=Math.max(r==null?void 0:r.top,p==null?void 0:p.top);z=Math.min(r==null?void 0:r.bottom,p==null?void 0:p.bottom)-$}const U=B>0?z/B*100:0;U>s&&(s=U,h=g)}),h},ce=a=>{const n=u==null?void 0:u.current[d];if(!n)return;if(o==="horizontal")n.scrollIntoView({behavior:"smooth",block:"nearest",inline:"start"});else{const h=a.getBoundingClientRect(),v=n.getBoundingClientRect(),b=(v==null?void 0:v.top)-(h==null?void 0:h.top);a.scrollTo({top:a.scrollTop+b,behavior:"smooth"})}};N.useEffect(()=>{if(!S||!(T!=null&&T.current))return;const a=T.current,n=()=>{const s=ie(a);s!==d&&q(s)};return a.addEventListener("scroll",n),ce(a),()=>{a.removeEventListener("scroll",n)}},[d,o,S,V]);const le=w(i.stepper,i[o],E,"react-stepflow-ui-stepper"),pe=w(i.contentContainer,k&&i.smoothTransition,!S&&o==="horizontal"?i.contentBelow:i.contentBeside,"react-stepflow-ui-content-container"),de=w(i.scrollContainer,o==="horizontal"?i.scrollContainerHorizontal:i.scrollContainerVertical,"react-stepflow-ui-scroll-container"),me=()=>e.Children.map(c,(a,n)=>{if(!e.isValidElement(a))return null;const s=a,h=n===(c==null?void 0:c.length)-1,v={...s.props,index:n,active:n===d,completed:n<d,onClick:s.props.onClick?()=>{var b,g;return(g=(b=s.props).onClick)==null?void 0:g.call(b,n)}:void 0,orientation:s.props.orientation??o,className:S?w(s.props.className,i.stepSpacing):s.props.className};return e.createElement(e.Fragment,{key:n},e.cloneElement(s,v),f&&!h&&e.createElement(ae,{orientation:o,completed:n<d,active:n===d,disabled:s.props.disabled,completedColor:C,activeColor:C,thickness:m}))}),Se=()=>e.createElement("div",{ref:T,className:de},c==null?void 0:c.map((a,n)=>{var g;if(!e.isValidElement(a))return null;const s=a;if(!s.props.component)return null;const h=n===d,v=n===d+1,b=w(i.stepContent,o==="horizontal"?i.stepContentHorizontal:i.stepContentVertical,h?i.activeStep:v?i.previewStep:"hidden");return e.createElement("div",{key:n,ref:r=>{var p,z;((p=u==null?void 0:u.current)==null?void 0:p.length)<=(c==null?void 0:c.length)&&(u.current=(z=u.current)==null?void 0:z.slice(0,c==null?void 0:c.length)),u.current[n]=r},className:b},(g=s.props)==null?void 0:g.component)})),ue=w(i.stepperWrapper,i[`stepperWrapper${((O=o==null?void 0:o.charAt(0))==null?void 0:O.toUpperCase())+(o==null?void 0:o.slice(1))}`],"react-stepflow-ui-stepper-wrapper");return e.createElement("div",{className:ue},e.createElement("div",{className:le,role:"group","aria-label":"Stepper Container"},me()),P&&(S?Se():e.createElement("div",{className:pe},P)))};_.__docgenInfo={description:"",methods:[],displayName:"Stepper",props:{activeStep:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},orientation:{required:!1,tsType:{name:"union",raw:'"horizontal" | "vertical"',elements:[{name:"literal",value:'"horizontal"'},{name:"literal",value:'"vertical"'}]},description:"",defaultValue:{value:'"horizontal"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},showConnector:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},connectorColor:{required:!1,tsType:{name:"string"},description:""},connectorThickness:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:""},smoothTransition:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},scrollComponent:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const Le={title:"Components/Stepper",component:_,tags:["autodocs"],parameters:{layout:"centered"},argTypes:{activeStep:{control:"number"},orientation:{control:"select",options:["horizontal","vertical"]},showConnector:{control:"boolean"},connectorColor:{control:"color"},connectorThickness:{control:"number"},smoothTransition:{control:"boolean"},scrollComponent:{control:"boolean"}}},H={render:t=>e.createElement("div",{className:"responsive-container"},e.createElement(_,{activeStep:t.activeStep,orientation:t.orientation,showConnector:t.showConnector,className:"wider-stepper"},e.createElement(l,{label:"Step 1",description:"First step description",className:"wider-step"}),e.createElement(l,{label:"Step 2",description:"Second step description",className:"wider-step"}),e.createElement(l,{label:"Step 3",description:"Third step description",className:"wider-step"}))),args:{activeStep:0,orientation:"horizontal",showConnector:!0}},W={render:t=>e.createElement("div",{className:"responsive-container"},e.createElement(_,{activeStep:t.activeStep,orientation:t.orientation,showConnector:t.showConnector},e.createElement(l,{label:"Step 1",description:"First step description"}),e.createElement(l,{label:"Step 2",description:"Second step description"}),e.createElement(l,{label:"Step 3",description:"Third step description"}))),args:{activeStep:0,orientation:"vertical",showConnector:!0}},F={render:t=>{const[o,f]=N.useState(0),E=()=>{f(m=>Math.min(m+1,2))},x=()=>{f(m=>Math.max(m-1,0))},C=m=>{f(m)};return e.createElement("div",{className:"responsive-container interactive-container"},e.createElement(_,{activeStep:o,orientation:"horizontal",showConnector:!0,className:"wider-stepper"},e.createElement(l,{label:"Step 1",description:"First step",onClick:C,className:"wider-step"}),e.createElement(l,{label:"Step 2",description:"Second step",onClick:C,className:"wider-step"}),e.createElement(l,{label:"Step 3",description:"Third step",onClick:C,className:"wider-step"})),e.createElement("div",{className:"interactive-controls"},e.createElement("button",{onClick:x,disabled:o===0,className:`control-button ${o===0?"disabled-button":"active-button"}`},"Back"),e.createElement("button",{onClick:E,disabled:o===2,className:`control-button ${o===2?"disabled-button":"active-button"}`},"Next")))},args:{activeStep:0},parameters:{controls:{exclude:["activeStep"]}}},M={render:t=>e.createElement("div",{className:"responsive-container"},e.createElement(_,{activeStep:t.activeStep,orientation:t.orientation,showConnector:t.showConnector,className:"wider-stepper"},e.createElement(l,{label:"Completed",description:"This step is done",completed:!0,className:"wider-step"}),e.createElement(l,{label:"Active",description:"Current step",active:!0,className:"wider-step"}),e.createElement(l,{label:"Error",description:"Something went wrong",error:!0,className:"wider-step"}),e.createElement(l,{label:"Disabled",description:"Cannot proceed",disabled:!0,className:"wider-step"}))),args:{activeStep:1,orientation:"horizontal",showConnector:!1}},I={render:t=>e.createElement("div",{className:"mobile-responsive-container",style:{width:"100%",maxWidth:"800px",height:"500px",margin:"0 auto",overflow:"hidden",position:"relative"}},e.createElement(_,{activeStep:t.activeStep,orientation:t.orientation,showConnector:t.showConnector,scrollComponent:t.scrollComponent},e.createElement(l,{label:"Step 1",description:"First step",component:e.createElement("div",{style:{padding:"20px",backgroundColor:"#f5f5f5",borderRadius:"4px",height:"100%",boxSizing:"border-box"}},e.createElement("h3",{style:{margin:"0 0 10px 0",fontSize:"18px"}},"Step 1 Content"),e.createElement("p",{style:{margin:0,fontSize:"14px"}},"This is the content for step 1. The content will adapt to different screen sizes."))}),e.createElement(l,{label:"Step 2",description:"Second step",component:e.createElement("div",{style:{padding:"20px",backgroundColor:"#f5f5f5",borderRadius:"4px",height:"100%",boxSizing:"border-box"}},e.createElement("h3",{style:{margin:"0 0 10px 0",fontSize:"18px"}},"Step 2 Content"),e.createElement("p",{style:{margin:0,fontSize:"14px"}},"This is the content for step 2. The content will adapt to different screen sizes."))}),e.createElement(l,{label:"Step 3",description:"Third step",component:e.createElement("div",{style:{padding:"20px",backgroundColor:"#f5f5f5",borderRadius:"4px",height:"100%",boxSizing:"border-box"}},e.createElement("h3",{style:{margin:"0 0 10px 0",fontSize:"18px"}},"Step 3 Content"),e.createElement("p",{style:{margin:0,fontSize:"14px"}},"This is the content for step 3. The content will adapt to different screen sizes."))}))),args:{activeStep:0,orientation:"horizontal",showConnector:!0,scrollComponent:!0,connectorThickness:1}};var j,G,J;H.parameters={...H.parameters,docs:{...(j=H.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: args => <div className="responsive-container">
      <Stepper activeStep={args.activeStep} orientation={args.orientation} showConnector={args.showConnector} className="wider-stepper">
        <Step label="Step 1" description="First step description" className="wider-step" />
        <Step label="Step 2" description="Second step description" className="wider-step" />
        <Step label="Step 3" description="Third step description" className="wider-step" />
      </Stepper>
    </div>,
  args: {
    activeStep: 0,
    orientation: 'horizontal',
    showConnector: true
  }
}`,...(J=(G=H.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var K,Q,X;W.parameters={...W.parameters,docs:{...(K=W.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: args => <div className="responsive-container">
      <Stepper activeStep={args.activeStep} orientation={args.orientation} showConnector={args.showConnector}>
        <Step label="Step 1" description="First step description" />
        <Step label="Step 2" description="Second step description" />
        <Step label="Step 3" description="Third step description" />
      </Stepper>
    </div>,
  args: {
    activeStep: 0,
    orientation: 'vertical',
    showConnector: true
  }
}`,...(X=(Q=W.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Y,Z,R;F.parameters={...F.parameters,docs:{...(Y=F.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: args => {
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
      setActiveStep(prevStep => Math.min(prevStep + 1, 2));
    };
    const handleBack = () => {
      setActiveStep(prevStep => Math.max(prevStep - 1, 0));
    };
    const handleStepClick = (index: number) => {
      setActiveStep(index);
    };
    return <div className="responsive-container interactive-container">
        <Stepper activeStep={activeStep} orientation="horizontal" showConnector={true} className="wider-stepper">
          <Step label="Step 1" description="First step" onClick={handleStepClick} className="wider-step" />
          <Step label="Step 2" description="Second step" onClick={handleStepClick} className="wider-step" />
          <Step label="Step 3" description="Third step" onClick={handleStepClick} className="wider-step" />
        </Stepper>
        
        <div className="interactive-controls">
          <button onClick={handleBack} disabled={activeStep === 0} className={\`control-button \${activeStep === 0 ? 'disabled-button' : 'active-button'}\`}>
            Back
          </button>
          <button onClick={handleNext} disabled={activeStep === 2} className={\`control-button \${activeStep === 2 ? 'disabled-button' : 'active-button'}\`}>
            Next
          </button>
        </div>
      </div>;
  },
  args: {
    activeStep: 0
  },
  parameters: {
    controls: {
      exclude: ['activeStep']
    }
  }
}`,...(R=(Z=F.parameters)==null?void 0:Z.docs)==null?void 0:R.source}}};var ee,te,oe;M.parameters={...M.parameters,docs:{...(ee=M.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: args => <div className="responsive-container">
      <Stepper activeStep={args.activeStep} orientation={args.orientation} showConnector={args.showConnector} className="wider-stepper">
        <Step label="Completed" description="This step is done" completed={true} className="wider-step" />
        <Step label="Active" description="Current step" active={true} className="wider-step" />
        <Step label="Error" description="Something went wrong" error={true} className="wider-step" />
        <Step label="Disabled" description="Cannot proceed" disabled={true} className="wider-step" />
      </Stepper>
    </div>,
  args: {
    activeStep: 1,
    orientation: 'horizontal',
    showConnector: false
  }
}`,...(oe=(te=M.parameters)==null?void 0:te.docs)==null?void 0:oe.source}}};var ne,re,se;I.parameters={...I.parameters,docs:{...(ne=I.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: args => <div className="mobile-responsive-container" style={{
    width: '100%',
    maxWidth: '800px',
    height: '500px',
    margin: '0 auto',
    overflow: 'hidden',
    position: 'relative'
  }}>
      <Stepper activeStep={args.activeStep} orientation={args.orientation} showConnector={args.showConnector} scrollComponent={args.scrollComponent}>
        <Step label="Step 1" description="First step" component={<div style={{
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        height: '100%',
        boxSizing: 'border-box'
      }}>
              <h3 style={{
          margin: '0 0 10px 0',
          fontSize: '18px'
        }}>Step 1 Content</h3>
              <p style={{
          margin: 0,
          fontSize: '14px'
        }}>This is the content for step 1. The content will adapt to different screen sizes.</p>
            </div>} />
        <Step label="Step 2" description="Second step" component={<div style={{
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        height: '100%',
        boxSizing: 'border-box'
      }}>
              <h3 style={{
          margin: '0 0 10px 0',
          fontSize: '18px'
        }}>Step 2 Content</h3>
              <p style={{
          margin: 0,
          fontSize: '14px'
        }}>This is the content for step 2. The content will adapt to different screen sizes.</p>
            </div>} />
        <Step label="Step 3" description="Third step" component={<div style={{
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        height: '100%',
        boxSizing: 'border-box'
      }}>
              <h3 style={{
          margin: '0 0 10px 0',
          fontSize: '18px'
        }}>Step 3 Content</h3>
              <p style={{
          margin: 0,
          fontSize: '14px'
        }}>This is the content for step 3. The content will adapt to different screen sizes.</p>
            </div>} />
      </Stepper>
    </div>,
  args: {
    activeStep: 0,
    orientation: "horizontal",
    showConnector: true,
    scrollComponent: true,
    connectorThickness: 1
  }
}`,...(se=(re=I.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};const Ae=["HorizontalStepper","VerticalStepper","InteractiveStepper","StepperWithStates","ScrollableStepper"];export{H as HorizontalStepper,F as InteractiveStepper,I as ScrollableStepper,M as StepperWithStates,W as VerticalStepper,Ae as __namedExportsOrder,Le as default};
