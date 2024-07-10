'use client'
import {pokemonapi, pokemonDetails} from '@/controller/ApiController'
import {pokeItems, pokeItemDetails } from '@/controller/ItemController';
import React, {useState, useEffect} from 'react'
import {Button, Slider} from "@nextui-org/react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, Divider} from "@nextui-org/react";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/react";
import {Card, CardHeader,CardFooter, CardBody, Image} from "@nextui-org/react";
import supabase from '@/controller/SupabaseController';


const Pokemon = () => {

    const [pokemons, setPokemons] = useState([])


    const [battleChanges, setBattleChanges] = useState()
    useEffect(() => {
        fetchPokemon()
        changeReceived()
    },[])


    const fetchPokemon = () => {
        // promise
        pokemonapi().then(res =>{
            console.log(res)
            setPokemons(res.results)
        })
    }
    
    const [items, setPokeItem] = useState([])

    useEffect(() => {
        fetchItems()
    },[])

    const fetchItems = () => {
        // promise
        pokeItems().then(res =>{
            console.log(res)
            setPokeItem(res.results)
        })
    }


    const [searchTerm, setSearchTerm] = useState([]);

    useEffect(() => {
        const filterPokemons = async () => {
          const res = await pokemonapi();
          const filteredPokemons = res.results.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setPokemons(filteredPokemons);
        };
      
        if (searchTerm) {
          filterPokemons();
        } else {
          fetchPokemon(); // Fetch all Pokemons if searchTerm is empty
        }
      }, [searchTerm]);

      const [searchItemTerm, setSearchItemTerm] = useState([]);

      useEffect(() => {
          const filterItems = async () => {
            const res = await pokeItems();
            const filteredPokemons = res.results.filter((pokemon) =>
              pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setPokeItem(filteredPokemons);
          };
        
          if (searchTerm) {
            filterPokeItem();
          } else {
            fetchPokeItem(); // Fetch all Pokemons if searchTerm is empty
          }
        }, [searchTerm]);
  


    const [selectedDetails, setSelectedDetails] = useState(null)
    const fetchDetails = (url) => {
        console.log(url)
        // 1. Create new api call on ApiController
        // 2. Using a promise, call the api
        pokemonDetails(url).then(res => {
            //console.log(res)
            // 3. Save the data fetched to state
            setSelectedDetails(res)
        })
        
    }

    const [selectedItemDetails, setSelectedItemDetails] = useState(null)
    const fetchItemDetails = (url) => {
        console.log(url)
        // 1. Create new api call on ApiController
        // 2. Using a promise, call the api
        pokeItemDetails(url).then(res => {
            //console.log(res)
            // 3. Save the data fetched to state
            setSelectedItemDetails(res)
        })
        
    }

    const changeReceived = () => {

        let battles = []
        const channels = supabase.channel('custom-all-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'battle' },
                (payload) => {

                    // return payload;

                    console.log('Change received!', payload)
                    battles.push(payload.me)
                }
            )
            .subscribe()
        setBattleChanges(battles)
    }

    const sendToBattle = async() => {

    let insertData = {
        name: 'aly',
        newObject: {
            pokemon_name: 'balbasaur',
            base_damage: 300,
            hp: 100,
            mp: 100,
            items: [
                {
                    item_name: 'necklace',
                    damage_effect: 100,
                    hp_effect: 0,
                    mp_effect: 0,
                }
            ]
        },
        opponent_name: 'mikko'
    }

    const { data, error } = await supabase
        .from('battle')
        .insert(insertData)
        .select()
}

  return (
    <div>
        <div>
        <Navbar isBordered>
        <NavbarContent>
            <NavbarBrand className="ml-2">
            <p className="font-bold color-black text-inherit">Choose your Pokemon</p>
            </NavbarBrand>
        </NavbarContent>

        <NavbarContent as="div" className="items-center" justify="end">
        <Input
            classNames={{
                base: "max-w-full sm:max-w-[20rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search pokemon..."
            size="sm"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </NavbarContent>

        <NavbarContent as="div" className="items-center" justify="end">
        <Input
            classNames={{
                base: "max-w-full sm:max-w-[20rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search items..."
            size="sm"
            type="search"
            value={searchItemTerm}
            onChange={(e) => setSearchItemTerm(e.target.value)}
            />
        </NavbarContent>
        </Navbar>
        </div>
        
        
        
        
        <div className="flex m-h-screen flex-col justify-between p-5">
         <div class="grid grid-cols-2 gap-8">
            <div  style={{ maxHeight: '365px', overflowY: 'auto', color:'black' }}>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>ACTIONS</TableColumn>

                    </TableHeader>
                        <TableBody>
                        {pokemons.map((row, key) => (
                        <TableRow key={key}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>
                                <Button color="default" onClick={() => fetchDetails(row.url)}>
                                    Show Details
                                </Button>

                                <Button color="default" onClick={() => sendToBattle()}>
                                    Send to Battle
                                </Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div class="col-span-1">
                <Card className="col-span-12 md:col-span-4 h-[365px]">
                    <CardHeader className="absolute z-10 ml-5 top-3 flex-col !items-start">
                        <h7 className="text-large text-black/80 uppercase font-bold">{selectedDetails && selectedDetails.name}</h7>
                        <p className="text-black font-small uppercase text-tiny">{selectedDetails && selectedDetails.abilities.map((ability, index) => (
                            <span key={index}>
                                {ability.ability.name}
                                {index !== selectedDetails.abilities.length - 1 && ', '}
                            </span>
                        ))}
                        </p>
                    </CardHeader>

                        <div className="absolute z-10 top-10 flex-col-right right-10">
                            <p className="text-black text-left mt-5 font-small uppercase text-tiny">{selectedDetails && selectedDetails.stats.map((stat, index) => (
                            <span key={index}>
                                {stat.stat.name}
                                {index !== selectedDetails.stats.length && <Slider 
                                            aria-label="Player progress" 
                                            color="foreground"
                                            hideThumb={true}
                                            value={stat.base_stat}
                                            className="max-w-md"
                                            />}
                            </span>
                        ))}
                        </p>
                        </div>

                    <Image
                        removeWrapper
                        alt="Card background"
                        className="z-0 w-80 h-80 mt-20 ml-4 object-cover float-right"
                        src={selectedDetails && selectedDetails.sprites.front_default}
                    />

                    <CardFooter className="absolute bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                            <div>
                            <p className="text-black ml-5 mb-1 uppercase text-tiny">{selectedDetails && selectedDetails.types.map((type, index) => (
                            <span key={index}>
                                {type.type.name}
                                {index !== selectedDetails.types.length - 1 && ', '}
                            </span>
                        ))}
                        </p>
                            {/* <Button color="default" onClick={() => sendToBattle()}>
                                    Send to Battle
                            </Button> */}
                            </div>
                 </CardFooter>
                </Card>
            </div>
            </div>
         </div>
         <div class="grid grid-cols-1 gap-8 p-5" style={{ maxHeight: '200px', maxWidth: '1200px', overflowY: 'auto', color:'black' }}>
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>ITEM NAME</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                    {items.map((items, key) => (
                    <TableRow key={key}>
                        <TableCell>{items.name}</TableCell>
                        <TableCell>
                        <Button color="default" onClick={() => fetchItemDetails(items.url)}>
                            Show Details
                        </Button>
                        {/* Add another button or functionality here if needed */}
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
    </div>
  )
}

export default Pokemon