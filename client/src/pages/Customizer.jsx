import {useState, useEffect} from 'react'
import {motion, AnimatePresence} from 'framer-motion';
import config from '../config/config';
import {download} from '../assets';
import state from '../store/index';
import { useSnapshot } from 'valtio';
import {downloadCanvasToImage, reader} from '../config/helpers';
import {EditorTabs, FilterTabs, DecalTypes} from '../config/constants';
import {fadeAnimation, slideAnimation} from '../config/motion';
import {FilePicker, Tab, ColorPicker, AIPicker, CustomeButton} from '../components'
const Customizer = () => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generateImg, setGenerateImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false
  });

// show the tab content depend on the active tab
const generateTabContent = () => {
   switch (activeEditorTab) {
    case 'colorpicker':
      return <ColorPicker/>
      case 'filepicker':
        return <FilePicker
        file={file}
        setFile={setFile}
        readFile={readFile}
        />
        case 'aipicker':
          return <AIPicker
          prompt={prompt}
          setPrompt={setPrompt}
          generateImg = {generateImg}
          handleSubmit = {handleSubmit}
          />
    default:
      return null;
   }
}

const handleSubmit = async (type) => {
  if(!prompt) return alert('Please enter a prompt first');

  try {
    // call our backend to generate images

    setGenerateImg(true);
    const response = await fetch('http://localhost:8080/api/v1/dalle', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        prompt,
      })
    })
    const data = await response.json();
    handleDecals(type, `data:image/png;base64,${data.photo}`);
  } catch (error) {
    alert(error);
  } finally {
    setGenerateImg(false);
    setActiveEditorTab("");

  }
}

const handleDecals = (type, result) => {
   const decalType = DecalTypes[type];
   state[decalType.stateProperty] = result;
   if(!activeFilterTab[decalType.filterTab]){
    handleActiveFilterTab(decalType.filterTab)
   }
}

const handleActiveFilterTab = (tabName) => {
  switch (tabName) {
    case 'logoShirt':
      state.isLogoTexture = !activeFilterTab[tabName];
      break;
      case 'stylishShirt':
      state.isFullTexture = !activeFilterTab[tabName];
      break;
  
    default:
      state.isFullTexture = false;
      state.isLogoTexture = true;
      break;
  }

  // after setting the state, set the activeFilterTab
  setActiveFilterTab((prevState) => {
    return {
      ...prevState,
      [tabName]: !prevState[tabName]
  }
  })
}

const readFile = (type) => {
  reader(file).then((result) => {
    handleDecals(type, result);
    setActiveEditorTab('');
  })
}

  return (
    <AnimatePresence>
      {!snap.intro && (

        <>
      <motion.div key='custom' className='absolute top-0 left-0 z-10' {...slideAnimation('left')}>
        <div className='flex items-center min-h-screen'>
         <div className='editortabs-container tabs'>
          {EditorTabs.map((tab) => (
           <Tab
           key={tab.name}
           tab={tab}
           handleOnClick= {() => setActiveEditorTab(tab.name)}
           />
          ))}
          {generateTabContent()}
         </div>

        </div>
      </motion.div>
      <motion.div className='absolute top-5 left-5 z-10' {...fadeAnimation}>
       <CustomeButton 
       type='filled'
       title='Go Back'
       handleOnClick={() => state.intro = true}
       customeStyles='w-fit px-4 py-2.5 font-bold text-sm'
       />
      </motion.div>
      <motion.div className='filtertabs-container' {...slideAnimation('up')}>
      {FilterTabs.map((tab) => (
           <Tab
           key={tab.name}
           tab={tab}
           isFilterTab
           isActiveTab={activeFilterTab[tab.name]}
           handleOnClick= {() => {handleActiveFilterTab(tab.name)}}
           />
          ))}
      <button className='download-btn' onClick={downloadCanvasToImage}>
              <img
                src={download}
                alt='download_image'
                className='w-3/5 h-3/5 object-contain'
              />
            </button>
      </motion.div>
      </>
      )}
    </AnimatePresence>
  )
}

export default Customizer