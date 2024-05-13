"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import * as React from "react"

import { cn } from "@/lib/utils"
import { Topic, Voice } from "@/types"
import { PauseIcon, PlayIcon, ThumbsDown, ThumbsUpIcon } from "lucide-react"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Button } from "../ui/button"

interface CreateContentProps extends React.HTMLAttributes<HTMLDivElement> {
  topics: Topic[],
  voices: Voice[],
}

const fetchListOfTextByTopic = async (topic: Topic): Promise<String> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`interface CreateContentProps extends React.HTMLAttributes<HTMLDivElement> {
        topics ${topic.label},
        voices: Voice[],
      }`)
    }, 1000);
  });
}

const FormDropDownTrigger = (props: { label: string }) => <DropdownMenuTrigger className="br-2">
  <p className="flex rounded	border-2 p-3 ">
    {props.label}
    <svg width="30" height="20" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H11L7.5 10.5L4 6Z" fill="currentColor"></path></svg>
  </p>
</DropdownMenuTrigger>

export function CreateContent({
  children,
  className,
  ...props
}: CreateContentProps) {
  const { topics, voices } = props
  const [formResponse, setFormResponse] = React.useState<{
    topic?: Topic,
    script?: String,
    voice?: Voice,
  }>();
  const [scriptInfo, setScriptInfo] = React.useState<{ loading: boolean, current?: String }>({ loading: false, current: "" });
  const activeSoundRef = React.useRef<Voice>();
  const [activeSound, setActiveSound] = React.useState<Voice & { playing: boolean }>();

  React.useEffect(() => {
    regenerateScript();
  }, [formResponse?.topic])

  const regenerateScript = () => {
    setFormResponse({ ...formResponse, script: undefined });
    if (formResponse?.topic) {
      setScriptInfo({ loading: true });
      fetchListOfTextByTopic(formResponse?.topic).then((script: String) => {
        setScriptInfo({ loading: false, current: script })
      })
    }
  }

  const addScriptToResponse = () => {
    setFormResponse({ ...formResponse, script: scriptInfo.current })
  }

  return (
    <Card className={cn(className)} {...props}>
      <CardContent className="pt-10">
        <DropdownMenu>
          <FormDropDownTrigger label={formResponse?.topic ? formResponse?.topic.label : "Select Topic"} />
          <DropdownMenuContent>
            {topics.map((topic) => <>
              <DropdownMenuItem asChild className="flex items-center space-x-2.5" onClick={(e) => {
                setFormResponse({ ...formResponse, topic })
              }}>
                <p className="text-sm ">{topic.label}</p>
              </DropdownMenuItem>
            </>)}
          </DropdownMenuContent>
        </DropdownMenu>
        {formResponse?.topic && <div className="py-2">
          <p className="text-lg font-extrabold">Script</p>
          {scriptInfo.loading ? <>Loading...</> : <>
            <p className="text-sm">
              {scriptInfo?.current}
            </p>
            <div className="flex flex-row space-x-3 pt-6">
              <ThumbsUpIcon fill={formResponse.script ? "green" : ""} className="cursor-pointer" onClick={addScriptToResponse} />
              <ThumbsDown className="cursor-pointer" onClick={regenerateScript} />
            </div>
          </>}
        </div>}
        <DropdownMenu>
          <FormDropDownTrigger label={formResponse?.voice ? formResponse?.voice.name : "Select Voice"} />
          <DropdownMenuContent >
            {voices.map(voice => ({
              ...voice,
              audio: new Audio(voice.link)
            })).map((voice) => <>
              <DropdownMenuItem key={voice.name} asChild onClick={(e) => {
                e.preventDefault();
              }}>
                <div className="flex justify-between space-x-2.5" onClick={(e) => {
                  e.preventDefault();
                  const currAudio = activeSoundRef.current;
                  if (currAudio?.audio) {
                    if (currAudio.name === voice.name) {
                      if (currAudio.audio.paused) {
                        currAudio.audio.play(), setActiveSound({ ...voice, playing: true });
                      } else {
                        currAudio.audio.pause(), setActiveSound({ ...voice, playing: false });
                      }
                      return;
                    }
                    currAudio?.audio.pause(); setActiveSound({ ...voice, playing: false });
                  }
                  activeSoundRef.current = voice;
                  activeSoundRef.current?.audio?.play();
                  setActiveSound({ ...voice, playing: true });
                }}>
                  <div  >
                    <p className="text-sm ">{voice.name}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {activeSound?.name === voice.name && activeSound.playing
                      ? <PauseIcon size={10} />
                      : <PlayIcon size={10} />
                    }
                    <p onClick={e => {
                      e.stopPropagation();
                      setFormResponse({ ...formResponse, voice });
                      activeSoundRef.current?.audio?.pause(); setActiveSound({ ...voice, playing: false });
                    }}>select</p>
                  </div>
                </div>
              </DropdownMenuItem>
            </>)}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
      <CardFooter>
        <Button disabled={!formResponse?.script || !formResponse?.topic || !formResponse?.voice} >Submit</Button>
      </CardFooter>
    </Card>
  )
}
