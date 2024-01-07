'use client';

import SideNav from '@/app/ui/dashboard/sidenav';
import {PropsWithChildren, useContext, useEffect, useMemo, useRef, useState} from "react";
import {LayoutRouterContext} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {usePathname, useSearchParams} from "next/navigation";
import {AnimatePresence, motion} from "framer-motion";

// TODO - Extract into its own component
function UnmountableRouter(props: PropsWithChildren<{}>) {
    const context = useContext(LayoutRouterContext);
    const [frozen, setFrozen] = useState(context);

    const params = useSearchParams().toString();
    const path = usePathname();
    const prevPath = useRef(path);

    // useEffect(() => {
    //     debugger;
    //         // only unfreeze if the path hasn't changed
    //         if (prevPath.current === path) {
    //             setFrozen(context);
    //         }
    //         prevPath.current = path;
    //     },
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //     [params, path]
    // );

    const memoizedContext = useMemo(() => ({ ...frozen, childNodes: context?.childNodes }), [frozen, context]);


    return (
        <LayoutRouterContext.Provider value={context}>
            {props.children}
        </LayoutRouterContext.Provider>
    );
}

function AnimatedPresence({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();

    return (
        <AnimatePresence>
            <motion.div
                key={pathname}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                    type: "tween",
                    stiffness: 260,
                    damping: 20,
                }}
            >
                <UnmountableRouter>
                    {children}
                </UnmountableRouter>
            </motion.div>
        </AnimatePresence>
    );
}


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                    {children}
            </div>
        </div>
    );
}