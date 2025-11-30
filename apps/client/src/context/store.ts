import { create } from 'zustand';

type useLoadingProps = {
    isLoading: boolean;
    changeLoadingStatus: (value: boolean) => void;
};

type useNotificationProps = {
    message: string;
    isVisible: boolean;
    showNotification: (message: string) => void;
};

export const useLoading = create<useLoadingProps>()((set) => ({
    isLoading: false,
    changeLoadingStatus: (value) => set(() => ({ isLoading: value })),
}));

export const useNotification = create<useNotificationProps>((set) => ({
    message: '',
    isVisible: false,

    showNotification: (message) => {
        setTimeout(() => {
            set({ message, isVisible: true });
        }, 500);

        setTimeout(() => {
            set({ message: '', isVisible: false });
        }, 3000);
    },
}));
