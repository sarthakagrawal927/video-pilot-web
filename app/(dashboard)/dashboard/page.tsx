import { redirect } from "next/navigation"

import { CreateContent } from "@/components/dashboard/createContent"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/session"
import { Topic, Voice } from "@/types"

export const metadata = {
  title: "Dashboard",
}

async function getTopicAndVoicesOptions(): Promise<{
  topics: Topic[],
  voices: Voice[]
}> {
  return {
    voices: [
      {
        link: "http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/win.ogg",
        name: "Ring"
      },
      {
        link: "http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/fx/engine-10.ogg",
        name: "Ding dong"
      },
      {
        link: "http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/fx/engine-11.ogg",
        name: "Disco"
      }
    ],
    topics: [
      {
        label: "Topic 1"
      },
      {
        label: "Topic 2"
      },
      {
        label: "Topic 3"
      },
      {
        label: "Topic 4"
      },
      {
        label: "Topic 5"
      },
    ],
  }
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const { voices, topics } = await getTopicAndVoicesOptions();

  return (
    <DashboardShell>
      <DashboardHeader heading="Panel" text="Create and manage content.">
        <Button>Create Content</Button>
      </DashboardHeader>
      <CreateContent topics={topics} voices={voices} />
    </DashboardShell>
  )
}
