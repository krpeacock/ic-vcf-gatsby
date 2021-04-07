import HM "mo:base/HashMap";
import Text "mo:base/Text";
import Error "mo:base/Error";
import Iter "mo:base/Iter";


actor {
  stable var entries : [(Text, Text)] = [];

  let store: HM.HashMap<Text, Text> = HM.fromIter(entries.vals(), 16, Text.equal, Text.hash);

  /// returns null if there was no previous value, else returns previous value
  public shared func set(k:Text,v:Text): async ?Text {
    if(k == ""){
      throw Error.reject("Empty string is not a valid key"); 
    };
    return store.replace(k, v);
  };

  public query func get(k:Text): async ?Text {
    return store.get(k);
  };

  system func preupgrade() {
    entries := Iter.toArray(store.entries());
  };

  system func postupgrade() {
    entries := [];
  };

};
