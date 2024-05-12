import { TScheduleSchema } from "@/app/schedules/add/ScheduleAddFormSchema";
import { generateTimeIntervals } from "@/app/schedules/add/helper";
import { DATE_FORMAT_VIEW } from "@/app/schedules/consts";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

type TProps = {
  FORM_ID: string;
  form: UseFormReturn<TScheduleSchema>;
  onSubmit: () => void;
};

export default function ScheduleAddForm(props: TProps) {
  const startTimeOptions = generateTimeIntervals({
    start: new Date(0, 0, 0, 0, 0),
    end: new Date(0, 0, 0, 23, 50),
    interval: 10,
  });

  const playTimeHourOptions = Array.from({ length: 24 }, (_, i) => i + 1);
  const participantsCountOptions = Array.from(
    { length: 11 },
    (_, i) => (i + 1) * 2
  );

  return (
    <Form {...props.form}>
      <form
        id={props.FORM_ID}
        className={"flex flex-1 flex-col gap-6"}
        onSubmit={props.form.handleSubmit(props.onSubmit)}
      >
        {/* matchDay */}
        <FormField
          control={props.form.control}
          name={"matchDay"}
          render={({ field }) => (
            <FormItem className={"flex flex-col"}>
              <FormLabel>{"날짜"}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, DATE_FORMAT_VIEW)
                      ) : (
                        <span>{"날짜를 선택해주세요."}</span>
                      )}
                      <CalendarIcon className={"ml-auto h-5 w-5 opacity-50"} />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className={"w-auto p-0"} align={"center"}>
                  <Calendar
                    mode={"single"}
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* start Time */}
        <FormField
          control={props.form.control}
          name={"startTime"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"시작 시간"}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={"시작 시간을 선택해주세요."} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {startTimeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* play Time */}
        <FormField
          control={props.form.control}
          name={"playTimeHour"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"경기 시간"}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={"경기 시간을 선택해주세요."} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {playTimeHourOptions.map((time) => (
                    <SelectItem key={time} value={`${time}`}>
                      {`+${time}시간`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
              <FormDescription>
                {"경기 종료시간은 시작 시간 + 경기 시간으로 설정됩니다."}
              </FormDescription>
            </FormItem>
          )}
        />

        {/* title */}
        <FormField
          control={props.form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"제목"}</FormLabel>
              <FormControl>
                <Input placeholder={"경기 제목을 입력해주세요."} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* participants */}
        <FormField
          control={props.form.control}
          name={"participantCount"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"인원"}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={"참여 인원을 선택해주세요."} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {participantsCountOptions.map((count) => (
                    <SelectItem key={count} value={`${count}`}>
                      {`${count}명`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* location */}
        {/* TODO 추후에 이넘으로 받으면 좋을듯 */}
        <FormField
          control={props.form.control}
          name={"location"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"장소"}</FormLabel>
              <FormControl>
                <Input placeholder={"경기 장소를 입력해주세요."} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* TODO 사진 추가 */}
      </form>
    </Form>
  );
}
