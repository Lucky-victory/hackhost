'use client'

import { Tab, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";

export default function TabsLayout({ children }: {children:React.ReactNode}){

    return <Tabs>
        <Tab>Projects</Tab>
        <Tab>Participants</Tab>

        <TabPanels>
            {children}
        </TabPanels>
    </Tabs>
}