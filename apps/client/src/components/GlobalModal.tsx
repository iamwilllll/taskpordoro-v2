import { useLoading, useNotification } from '../context/store';
import { Alert, Slide, Snackbar, type SlideProps } from '@mui/material';

export default function GlobalModal() {
    const { isLoading } = useLoading();
    const { message, isVisible } = useNotification();

    function SlideTransition(props: SlideProps) {
        return <Slide {...props} direction="left" />;
    }

    return (
        <>
            <div className={`${isLoading ? 'absolute' : 'hidden'} bg-modal z-10 flex size-full items-center justify-center`}>
                <div className="loader"></div>
            </div>

            <Snackbar
                open={isVisible}
                slots={{ transition: SlideTransition }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert severity="success" variant="outlined" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
}
