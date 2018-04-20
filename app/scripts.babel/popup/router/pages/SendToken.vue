<template>
    <div>
        <popup-header/>
        <div class="container">
            <h1>Send Four</h1>
            <div class="form-group">
                <label for="recipient">Recipient Address:</label>
                <input id="recipient" type="text"/>
                <hr>
                <label for="amount">Amount:</label>
                <input id="amount" type="text"/>
            </div>
            <div class="totals">
                <div><label>Transaction Fee:</label> <!-- TODO:: XY FOUR --></div>
                <div><label>Total:</label> <!-- TODO:: XY FOUR --></div>
            </div>
            <div class="form-group">
                <button class="btn">Send</button>
            </div>
        </div>
    </div>
</template>
