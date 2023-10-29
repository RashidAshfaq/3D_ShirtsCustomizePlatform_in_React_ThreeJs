import {motion, AnimatePresence} from 'framer-motion';
import {useSnapshot} from 'valtio';
import {
slideAnimation,
headContainerAnimation,
headContentAnimation,
headTextAnimation
} from '../config/motion';
import state from '../store/index'
import {CustomeButton} from '../components';


const Home = () => {
  const snap = useSnapshot(state);
  return (
    <AnimatePresence>
      {snap.intro && (
       <motion.section className='home' {...slideAnimation('left')}>
        <motion.header {...slideAnimation('down')}>
          <img  src='./threejs.png' alt='logo' className='w-8 h-8 object-contain'/>
        </motion.header>

        <motion.div className='head-content' {...headContainerAnimation}>
         <motion.div {...headTextAnimation}>
          <h1 className='head-text'>
            LET'S <br className='xl:block hidden'/> DO IT.
          </h1>
         </motion.div>
         <motion.div {...headContentAnimation} className='flex gap-5 flex-col'>
          <p className='max-w-md font-normal text-gray-600 text-base'>
            Create your unique and exclusive shirt with out brand-new 3D customization tool. <strong>Unleash your imagination</strong>{" "} and define your own style.
          </p>
          <CustomeButton
          type='filled'
          title='Customize it'
          handleOnClick= {()=> state.intro = false}
          customeStyles = 'w-fit px-4 py-2.5 font-bold text-sm'
          />
         </motion.div>
        </motion.div>
       </motion.section>
      )}
    </AnimatePresence>
    )
}

export default Home