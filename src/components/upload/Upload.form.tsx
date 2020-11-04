import React, { FC, ChangeEvent, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

import { uploadApi } from '../../api/upload.api'

export const UploadForm: FC = () => {

    const [file, setFile] = useState<File | null>(null)
    const [previewFile, setPreviewFile] = useState('')

    const _close = () => setFile(null)
    
    const _handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target

        if (!files) return

        setFile(files[0])
        setPreviewFile(URL.createObjectURL(files[0]))
    }

    const _uploadFile = async () => {
        if (!file) return

        const token = localStorage.getItem('authData')

        const formData = new FormData()

        formData.append('file', file)

        try {

            await uploadApi.upload(formData, token!)

            _close()

        } catch (err) {
            throw err
        }
    }

    return (
        <>
            <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
            >
                Upload image
            <input
                type="file"
                style={{ display: "none" }}
                onChange={_handleFile}
            />
            </Button>
            <Dialog
                open={file ? true : false}
                onClose={_close}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Upload image</DialogTitle>
                <DialogContent>
                    <img 
                        src={previewFile} 
                        width='160px' 
                        height='160px' 
                        style={{
                            borderRadius: '50%'
                        }} 
                        alt=""
                    />   
                </DialogContent>
                <DialogActions>
                    <Button onClick={_close} color="secondary">
                        Cancel
                    </Button>
                    <Button color="primary" onClick={_uploadFile}>
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}