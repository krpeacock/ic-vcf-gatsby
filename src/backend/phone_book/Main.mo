import AL "mo:base/AssocList";
import Text "mo:base/Text";
import Error "mo:base/Error"


actor {
  stable var store : AL.AssocList<Text, Text> = null;

  /// returns null if there was no previous value, else returns previous value
  public shared func set(k:Text,v:Text): async ?Text {
    if(k == ""){
      throw Error.reject("Empty string is not a valid key"); 
    };
    let (newStore, oldValue) = AL.replace(store, k, Text.equal, ?v);
    store := newStore;
    return oldValue;
  };

  public query func get(k:Text): async ?Text {
    return AL.find(store, k, Text.equal)
  };

};
