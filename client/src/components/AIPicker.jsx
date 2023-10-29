import React from 'react'
import CustomButtom from './CustomeButton';


const AIPicker = ({prompt, setPrompt, generateImg, handleSubmit}) => {
  return (
    <div className='aipicker-container'>
      <textarea
      className='aipicker-textarea'
      placeholder='Ask AI...'
      rows={5}
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      />

      <div className='flex flex-wrap gap-3'>
      {generateImg ? (
        <CustomButtom
        type='outline'
        title='Asking AI..'
        customeStyles='text-xs'
        />
      ) : (
        <>
        <CustomButtom
        type='outline'
        title='AI Logo..'
        customeStyles='text-xs'
        handleOnClick={() => handleSubmit('logo')}
        />
        <CustomButtom
        type='filled'
        title='AI Full..'
        customeStyles='text-xs'
        andleOnClick={() => handleSubmit('full')}
        />
        </>
      )}
      </div>

    </div>
  )
}

export default AIPicker