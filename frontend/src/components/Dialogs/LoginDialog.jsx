import React, { useEffect } from 'react'
import { Button, Dialog, useDialog } from '@chakra-ui/react'
import { useLoginDialogStore } from '../../store/dialogs'

function LoginDialog() {
    const dialog = useDialog()
    const setDialog = useLoginDialogStore(state => state.setDialog)

    useEffect(() => {
        setDialog(dialog)
    }, [])

    return (
        <Dialog.RootProvider value={dialog}>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Войдите</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            body
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button>
                                Войти или зарегистрироваться
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
        </Dialog.RootProvider>
    )
}

export default LoginDialog
