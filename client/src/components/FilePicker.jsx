import CustomeButton from "./CustomeButton"

const FilePicker = ({file, setFile, readFile}) => {
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input
        id="file-upload"
        type="file"
        accept="image*/"
        onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          File Upload
        </label>
        <p className="mt-2 text-gray-500 text-xs truncate">
         {file ? file.name : 'No File Selected'}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
       <CustomeButton 
       type='outline'
       title='Logo'
       handleOnClick={() => readFile('logo')}
       customeStyles='text-xs'
       />
       <CustomeButton 
       type='filled'
       title='Full'
       handleOnClick={() => readFile('full')}
       customeStyles='text-xs'
       />
      </div>
    </div>
  )
}

export default FilePicker