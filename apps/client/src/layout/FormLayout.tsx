type FormLayoutProps = {
    children?: React.ReactNode;
    title?: string;
    description?: string;
};

export default function FormLayout({ children, title, description }: FormLayoutProps) {
    return (
        <section className="flex size-full">
            <section className="from-primary-600 to-secondary-300 hidden h-full w-6/10 border-4 border-white bg-linear-to-b lg:block">
                <div className="rough_texture_background flex h-full flex-col items-center justify-between py-10">
                    <header className="text-secondary-200 mt-30 flex w-5/10 flex-col gap-5">
                        <p className="text-6xl">*</p>
                        <p className="text-6xl">Hello</p>
                        <h1 className="text-6xl">{title ? title : 'TaskPodoro!'}</h1>
                        <h2 className="text-2xl">
                            {description
                                ? description
                                : `TaskPodoro, the best technique for managing your time, achieving the highest level of productivity and management`}
                        </h2>
                    </header>
                    <footer>
                        <p className="text-secondary-200">© {new Date().getFullYear()} TaskPodoro. All rights reserved</p>
                    </footer>
                </div>
            </section>

            <section className="lg:items-left flex w-full flex-col items-center justify-center lg:w-4/10 lg:p-20">
                {children}
            </section>
        </section>
    );
}
