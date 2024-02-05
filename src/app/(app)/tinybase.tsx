import { usePowerSync } from "@journeyapps/powersync-sdk-react-native";
import { useEffect } from "react";
import { Text, YStack } from "tamagui";
import { createPowerSyncPersister } from "tinybase/lib/persisters/persister-powersync";
import { createStore } from "tinybase/lib/store";

import { uuid } from "@/lib/uuid";

export default function TinyBase() {
  const powerSync = usePowerSync();

  const store = createStore();

  const persister = createPowerSyncPersister(store, powerSync, {
    mode: "tabular",
    tables: {
      load: {
        profiles: {
          tableId: "profiles",
          rowIdColumnName: "id",
        },
        contacts: {
          tableId: "contacts",
          rowIdColumnName: "id",
        },
      },
      save: {
        profiles: {
          tableName: "profiles",
          rowIdColumnName: "id",
        },
        contacts: {
          tableName: "contacts",
          rowIdColumnName: "id",
        },
      },
    },
  });

  const counter = 7;

  // useEffect(() => {
  //   const abortController = new AbortController();
  //     (async () => {
  //         for await(const update of powerSync.watch('SELECT * from profiles', [], {signal: abortController.signal})) {
  //             console.log("UPDATE", update)
  //         }
  //         for await(const update of powerSync.onChange({rawTableNames:true, signal: abortController.signal})) {
  //             console.log("ONCHANGE", update)
  //         }
  //     })();

  //     return () => {
  //         abortController.abort();
  //     }

  //   const listen = async () => {
  //       for await (const event of powerSync.onChange()) {
  //         arrayForEach(event.changedTables, (tableName) => {
  //           console.log("CHANGE!!!!!!!!!!!!!!!!!!!!!!!", 'changedTable', tableName);
  //         });
  //       }
  //     };

  //     console.log('listening!', counter);

  //     listen();
  // }, [counter]);

  useEffect(() => {
    async function persist(counter: number) {
      console.log("persist", counter);

      await persister.load();
      // console.log("Loaded", store.getTablesJson());

      const newProfileId = uuid();
      store.setRow("profiles", newProfileId, {
        demo: true,
        handle: uuid(),
        name: "1112345 John Doe",
      });

      store.setRow("contacts", uuid(), {
        owner_id: "38394358-931c-49b9-a0d8-1f685763d10f",
        profile_id: newProfileId,
      });

      await persister.save();

      // console.log("Saved", store.getTablesJson());
    }

    persist(counter);

    const listenerId = store.addTablesListener(() =>
      console.log("Tables changed!")
    );

    return () => store.delListener(listenerId);
  }, [persister, counter]);

  return (
    <YStack>
      <Text>TinyBase</Text>
      {}
    </YStack>
  );
}
