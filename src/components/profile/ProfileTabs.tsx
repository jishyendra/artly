"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Timeline from "@/components/Timeline";
import Account from "./Account";
import CreatePostForm from "../post/Compose";

export default function ProfileTabs() {
  return (
    <Tabs defaultValue="timeline">
      <TabsList className="w-full py-1 mx-auto">
        <TabsTrigger value="timeline">Timeline</TabsTrigger>
        <TabsTrigger value="collection">Collection</TabsTrigger>
        <TabsTrigger value="media">Media</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
      </TabsList>
      <TabsContent value="timeline">
        <CreatePostForm />
        <Timeline />
      </TabsContent>
      <TabsContent value="collection">Collections</TabsContent>
      <TabsContent value="media">Gallery</TabsContent>
      <TabsContent value="account">
        <Account />
      </TabsContent>
    </Tabs>
  );
}
